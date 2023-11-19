const GeoPoint = require("geopoint");
const KILO_TO_METER = 1000;

function calcaulateDistance(provider, postcode) {
  const point1 = new GeoPoint(provider.lat, provider.lon);
  const point2 = new GeoPoint(postcode.lat, postcode.lon);

  const distance = point1.distanceTo(point2, true) * KILO_TO_METER;

  return distance;
}

function isWithinRange(provider, postcode) {
  let max_distance = provider.maxDrivingDistance;
  switch (postcode.group) {
    case "group_a":
      break;
    case "group_b":
      max_distance += 2 * KILO_TO_METER;
    case "group_c":
      max_distance += 5 * KILO_TO_METER;
  }

  return max_distance >= provider.distance;
}

function calcaulateRank(provider) {
  const DEFAULT_DIST = 80 * KILO_TO_METER;

  let descScore = provider.descScore;
  let picScore = provider.picScore;
  let profielScore = 0.4 * picScore + 0.6 * descScore;

  const dist = provider.distance;

  let distScore = 1 - dist / DEFAULT_DIST;

  let distWeight = dist > DEFAULT_DIST ? 0.01 : 0.15;

  let rank = distWeight * distScore + (1 - distWeight) * profielScore;

  return rank;
}

module.exports = {
  calcaulateDistance,
  isWithinRange,
  calcaulateRank,
};
