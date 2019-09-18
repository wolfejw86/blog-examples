const FastSpeedtest = require("fast-speedtest-api");

const speedtest = new FastSpeedtest({
  token: "your-app-token", // required
  verbose: false, // default: false
  timeout: 10000, // default: 5000
  https: true, // default: true
  urlCount: 5, // default: 5
  bufferSize: 8, // default: 8
  unit: FastSpeedtest.UNITS.Mbps // default: Bps
});

speedtest
  .getSpeed()
  .then(s => {
    console.log(`Speed: ${s} Mbps`);
  })
  .catch(e => {
    console.error(e.message);
  });
