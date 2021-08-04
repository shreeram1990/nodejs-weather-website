const request = require("request");

const foreCast = (latitude, longitude, unit = "", callback) => {
  const url = `http://api.weatherstack.com/current?access_key=8bf406875179eede841899649d20164c&query=${latitude},${longitude}&units=${unit}`;

  // response => destructure to body
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unbale to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location!!", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}, It is currently ${body.current.temperature} degrees out. it feels like ${body.current.feelslike} degrees out`
      );
    }
  });
};

module.exports = foreCast;
