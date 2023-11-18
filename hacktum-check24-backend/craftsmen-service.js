const { getDatabaseClient } = require("./database-client");

const TABLENAME = "craftsmen";
const COLUMNS_ID = "id";
const COLUMNS_MAX_DRIVING_DISTANCE = "max_driving_distance";
const COLUMNS_PROFILE_PICTURE_SCORE = "profile_picture_score";
const COLUMNS_PROFILE_DESCRIPTION_SCORE = "profile_description_score";

const getMappedCraftsman = (craftsman) => ({
  id: craftsman.id,
  name: `${craftsman.first_name} ${craftsman.last_name}`,
  rankingScore: craftsman.distance,
});

const patchMappedCraftsman = (craftsman) => ({
  maxDrivingDistance: craftsman.maxDrivingDistance,
  profilePictureScore: craftsman.profilePictureScore,
  profileDescriptionScore: craftsman.profileDescriptionScore,
});

const mockCraftsmen = [
  {
    id: 1,
    first_name: "Gennie",
    last_name: "Luettgen",
    city: "West Claretta",
    street: "Jon Manor",
    house_number: "20",
    lon: 7.01926,
    lat: 50.89849,
    max_driving_distance: 97000,
  },
  {
    id: 2,
    first_name: "Jaymie",
    last_name: "Rogahn",
    city: "Lucaschester",
    street: "Zemlak Row",
    house_number: "101",
    lon: 13.37789,
    lat: 52.56637,
    max_driving_distance: 92000,
  },
];

const mockUpdatedData = {
  maxDrivingDistance: 3000,
  profilePictureScore: 2000,
  profileDescriptionScore: 1000,
};

const getCraftsmen = async (postalCode) => {
  const client = await getDatabaseClient();

  const query = "SELECT * FROM craftman";

  const result = await client.query(query);

  result.rows.forEach((row) => {
    const newPropertyValue = 10; // Replace "yourFunction" with your actual function
    row.distance = newPropertyValue;
  });

  result.rows.filter((row) => row.id < 10);

  client.release();

  return result.rows; //mockCraftsmen; //result.rows;
};

const updateCraftsman = async (
  craftsmanId,
  { maxDrivingDistance, profilePictureScore, profileDescriptionScore }
) => {
  //   const client = await getDatabaseClient();

  //   const updateFields = [];
  //   const params = [];

  //   if (maxDrivingDistance !== undefined) {
  //     updateFields.push(
  //       `${COLUMNS_MAX_DRIVING_DISTANCE} = ${maxDrivingDistance}`
  //     );
  //   }

  //   if (profilePictureScore !== undefined) {
  //     updateFields.push(
  //       `${COLUMNS_PROFILE_PICTURE_SCORE} = ${profilePictureScore}`
  //     );
  //   }

  //   if (profileDescriptionScore !== undefined) {
  //     updateFields.push(
  //       `${COLUMNS_PROFILE_DESCRIPTION_SCORE} = ${profileDescriptionScore}`
  //     );
  //   }

  //   const result = await client.query(
  //     `UPDATE ${TABLENAME} SET ${updateFields.join(
  //       ", "
  //     )} WHERE ${COLUMNS_ID}=${craftsmanId} RETURNING *;`
  //   );

  //   client.release();

  return mockUpdatedData; //result.rows[0];
};

module.exports = {
  getMappedCraftsman,
  patchMappedCraftsman,
  getCraftsmen,
  updateCraftsman,
};
