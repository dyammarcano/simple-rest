var cfg        = require('config.json')('./config.json');
var User       = require('../models/account');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.profile = function(req, res) {
  sendJSONresponse(res, 200, { welcome: req.user.email });
};

module.exports.status = function(req, res) {
  //console.log("user: " + JSON.stringify(req.user));
  sendJSONresponse(res, 200, cfg.api);
};

module.exports.list = function(req, res) {

  User.find({}, function(err, users) {
    sendJSONresponse(res, 200, users);
  });
};

module.exports.find = function(req, res) {

	User.findOne({ name: req.body.name }, function(err, user) {
	  sendJSONresponse(res, 200, users);
	});
};

module.exports.add = function(req, res) {

};

module.exports.delete = function(req, res) {

};

module.exports.syspend = function(req, res) {

};