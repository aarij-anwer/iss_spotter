const request = require('request');
let URL = "https://api.ipify.org?format=json";

const fetchMyIP = function(callback) {
  request(URL, (error, response, body) => {
    if (error) {
      callback(error);
    } else if (response.statusCode === 200) {
      let ipAdd = JSON.parse(body);
      callback(false, ipAdd["ip"]);
    } else {
      const msg = `Status Code ${response.statusCode} when fetching IP.`;
      callback(Error(msg), null);
    }
  });
  return;
};

module.exports = { fetchMyIP };