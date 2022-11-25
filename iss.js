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

const fetchCoordsByIP = function(ip, callback) {
  let ipLookup = "http://ipwho.is/" + ip;
  let answer;
  request(ipLookup, (error, response, data) => {
    if (error) {
      callback(error);
    } else if (response.statusCode === 200) {
      let latlong = JSON.parse(data);
      if (latlong.success) {
        answer = {
          latitude: latlong.latitude,
          longitude: latlong.longitude
        };
      } else {
        answer = latlong.message;
      }
      callback(false, answer);
    } else {
      const msg = `Status Code ${response.statusCode} when fetching IP.`;
      callback(Error(msg), null);
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };