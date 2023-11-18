const { getDatabaseClient } = require("./database-client");
const {
  calcaulateDistance,
  isWithinRange,
  calcaulateRank,
} = require("./ranking.js");

const TABLENAME_CRAFTMAN = "craftman";
const TABLENAME_POSTCODE = "postcodes";
const COLUMNS_ID = "id";
const COLUMNS_POSTALCODE = "postcode";
const COLUMNS_GROUP = "postcode_extension_distance_group";
const COLUMNS_MAX_DRIVING_DISTANCE = "max_driving_distance";
const COLUMNS_PROFILE_PICTURE_SCORE = "profile_picture_score";
const COLUMNS_PROFILE_DESCRIPTION_SCORE = "profile_description_score";

const craftman = (item) => ({
  lon: Number(item.lon),
  lat: Number(item.lat),
  distance: Number(item.distance),
  maxDrivingDistance: Number(item.max_driving_distance),
  descScore: item.profile_description_score,
  picScore: item.profile_picture_score,
});

const getMappedPostcode = (postcode) => ({
  lon: Number(postcode.lon),
  lat: Number(postcode.lat),
  group: postcode.postcode_extension_distance_group,
});

const getMappedCraftsman = (craftsman) => ({
  id: craftsman.id,
  name: `${craftsman.first_name} ${craftsman.last_name}`,
  rankingScore: craftsman.distance,
});

const patchMappedCraftsman = (craftsman) => ({
  maxDrivingDistance: craftsman.max_driving_distance,
  profilePictureScore: craftsman.profile_picture_score,
  profileDescriptionScore: craftsman.profile_description_score,
});

const getCraftsmen = async (postalCode, page, pageSize) => {
  const client = await getDatabaseClient();

  let result = await client.query(`SELECT * FROM ${TABLENAME_CRAFTMAN}`);

  const postalCodeData = await client.query(
    `SELECT lon, lat, ${COLUMNS_GROUP} FROM ${TABLENAME_POSTCODE} WHERE ${COLUMNS_POSTALCODE}='${postalCode}';`
  );

  client.release();

  postcode = getMappedPostcode(postalCodeData.rows[0]);

  result.rows.forEach((row) => {
    const distance = calcaulateDistance(craftman(row), postcode);
    row.distance = distance;
  });

  let validResult = result.rows.filter((row) =>
    isWithinRange(craftman(row), postcode)
  );

  validResult.forEach((row) => {
    const rank = calcaulateRank(craftman(row));
    row.rank = rank;
  });

  sortedResult = validResult.sort(({ rank: a }, { rank: b }) => b - a);

  return sortedResult;
};

const updateCraftsman = async (
  craftsmanId,
  { maxDrivingDistance, profilePictureScore, profileDescriptionScore }
) => {
  const client = await getDatabaseClient();

  const updateFields = [];

  if (maxDrivingDistance !== undefined) {
    updateFields.push(
      `${COLUMNS_MAX_DRIVING_DISTANCE} = ${maxDrivingDistance}`
    );
  }

  if (profilePictureScore !== undefined) {
    updateFields.push(
      `${COLUMNS_PROFILE_PICTURE_SCORE} = ${profilePictureScore}`
    );
  }

  if (profileDescriptionScore !== undefined) {
    updateFields.push(
      `${COLUMNS_PROFILE_DESCRIPTION_SCORE} = ${profileDescriptionScore}`
    );
  }

  const result = await client.query(
    `UPDATE ${TABLENAME_CRAFTMAN} SET ${updateFields.join(
      ", "
    )} WHERE ${COLUMNS_ID}=${craftsmanId} RETURNING *;`
  );

  client.release();

  return result.rows[0];
};

module.exports = {
  getMappedCraftsman,
  patchMappedCraftsman,
  getCraftsmen,
  updateCraftsman,
};
