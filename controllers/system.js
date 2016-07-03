var cfg        = require('config.json')('./config.json');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.fam = function(req, res) {

};