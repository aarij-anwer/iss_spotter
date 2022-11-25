const request = require('request');

const fetchMyIP = function(callback) {
  let URL = "https://api.ipify.org?format=json";
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

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  let URL = "https://iss-flyover.herokuapp.com/json/?" + "lat=" + coords.latitude + "&lon=" + coords.longitude;

  request(URL, (error, response, data) => {
    if (error) {
      callback(error);
    } else if (response.statusCode === 200) {
      let answer = JSON.parse(data).response;
      callback(false, answer);
    } else {
      callback(false, data);
    }
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error);
      return;
    }
    fetchCoordsByIP(ip,(error, data) => {
      if (error) {
        callback(error);
        return;
      } else {
        fetchISSFlyOverTimes(data,(error, data) => {
          if (error) {
            callback(error);
            return;
          } else {
            callback(false, data);
          }
        });
      }
    });
  });
  
};

module.exports = { nextISSTimesForMyLocation };