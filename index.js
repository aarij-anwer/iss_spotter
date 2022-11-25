// eslint-disable-next-line no-unused-vars
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work! ", error);
//     return;
//   }
//   console.log("It worked! Returned IP: ", ip);

//   fetchCoordsByIP(ip,(error, data) => {
//     if (error) {
//       console.log("Something did not work: ", error);
//     } else {
//       console.log("Coordinates by IP: ", data);

//       fetchISSFlyOverTimes(data,(error, data) => {
//         if (error) {
//           console.log("Fly over times: something went wrong! ", error);
//         } else {
//           console.log("Fly over times: ", data);
//         }
//       });
//     }
//   });
// });


