export function toMiles(dist) {
  return 0.621371 * dist;
}

// Computes distance between two geo coordinates in kilometers.
export function computeDistance(location1, location2) {
    // console.log("locs: ",location1, location2);

  let { latitude: lat1, longitude: lon1 } = location1;
  let { latitude: lat2, longitude: lon2 } = location2;
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

  d = toMiles(d);

  return round(d, 3);
}


export function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }