// Converts from degrees to radians.
export function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

// Converts from radians to degrees.
export function toDegrees(radians) {
  return (radians * 180) / Math.PI;
}

export function toMiles(dist) {
  return 0.621371 * dist;
}

export function toMils(degrees) {
  return degrees * 17.777777777778;
}

// Computes distance between two geo coordinates in kilometers.
export function computeDistance(lat1, lon1, lat2, lon2, unit) {
  console.log(`p1={${lat1},${lon1}} p2={${lat2},${lon2}}`);
  var R = 6371; // km (change this constant to get miles)
  var dLat = ((lat2 - lat1) * Math.PI) / 180;
  var dLon = ((lon2 - lon1) * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  if (unit === "Miles") {
    d = toMiles(d);
  }

  return `${round(d, 3)} ${unit}`;
}

// Computes bearing between two geo coordinates in degrees.
export function computeBearing(startLat, startLng, destLat, destLng, unit) {
  startLat = toRadians(startLat);
  startLng = toRadians(startLng);
  destLat = toRadians(destLat);
  destLng = toRadians(destLng);

  var y = Math.sin(destLng - startLng) * Math.cos(destLat);
  var x =
    Math.cos(startLat) * Math.sin(destLat) -
    Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  var brng = Math.atan2(y, x);
  brng = toDegrees(brng);
  var result = (brng + 360) % 360;

  if (unit === "Mils") {
    result = toMils(result);
  }
  return `${round(result, 3)} ${unit}`;
}

export function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}
