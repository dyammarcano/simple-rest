var cfg        = require('config.json')('./config.json');
var crc32      = require('js-crc').crc32;
var request    = require('request');
var network    = require('os').networkInterfaces();
var moment     = require('moment');

moment().format();

setInterval(service(), cfg.interval);

function service() {
  param = {
    address    : network.eth0[0].address,
    mac        : network.eth0[0].mac,
    family     : network.eth0[0].family,
    netmask    : network.eth0[0].netmask,
    crc        : crc32(network.eth0[0].mac).toUpperCase(),
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
}

