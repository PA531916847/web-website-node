const request = require('request');
const forecast = (lat, lang, callback) => {
  const url =
    'https://api.darksky.net/forecast/ae57ac34bd6c4ba5b4caa58acfc09fce/' +
    lat +
    ',' +
    lang +
    '?units=us';
  console.log('lat ' + lat);
  console.log('lang ' + lang);
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback('unable to connect to forecast api', undefined);
    } else if (body.error) {
      callback(
        'unable to fetch data from forecast . Please try other search',
        undefined
      );
    } else {
      callback(
        undefined,
        'it is currently ' +
          body.currently.temperature +
          'degreesout. there is a ' +
          body.currently.precipProbability +
          '% f rain'
      );
    }
  });
};
module.exports = forecast;
