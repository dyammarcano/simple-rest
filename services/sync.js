var crc32      = require('js-crc').crc32;
var request    = require('request');
var moment     = require('moment');

moment().format();

module.exports.service = function (adapter, cfg) {
  param = {
    address    : adapter.address,
    mac        : adapter.mac,
    family     : adapter.family,
    netmask    : adapter.netmask,
    crc        : crc32(adapter.mac).toUpperCase(),
    local_time : moment().unix(),
    info       : cfg.info,
    type       : 'sync'
  };

  var options = {
    url: cfg.server,
    method: 'POST',
    headers: {
      'User-Agent': 'Super Agent/0.0.1',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: param,
  };

  request(options, function(error, response, body) {
    if (error) {
      console.log(error);
    }
    if (response.statusCode === 200) {
      if (response.headers['content-type'] === 'application/json') {
        state = JSON.parse(body);
        console.log("device: " + param.crc + " sync to: " + cfg.server + " " + state.saved);
      } else {
        console.log(body);
      }
    }
  });
};
