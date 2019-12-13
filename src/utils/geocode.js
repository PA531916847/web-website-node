const request = require('request');
const geocode = (adress, callback) => {
  const geoCodeUrl =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    adress +
    '.json?access_token=pk.eyJ1IjoicGE1MzE5MTY4NDciLCJhIjoiY2szeDZhdHg0MG43NDNtcDc4YnN6dWE2OSJ9.PZU8Xvo1ZKCfRJv9PZwnwg';
  request({ url: geoCodeUrl, json: true }, (error, { body }) => {
    if (error) {
      callback('unable to connect to geo api', undefined);
    } else if (body.features.length === 0) {
      callback('unable to fetch data . Please try other search', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
};
module.exports = geocode;
