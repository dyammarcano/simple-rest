var cfg            = require('../config'); 


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// route /api/info
module.exports.routesInfo = function(req, res) {
  sendJSONresponse(res, 200, cfg.routes);
};

module.exports.status = function(req, res) {
  sendJSONresponse(res, 200, { status : cfg.api });
};

module.exports.fam = function(req, res) {

};