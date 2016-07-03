var cfg        = require('config.json')('./config.json');
var User       = require('../models/account');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.home = function(req, res) {
  sendJSONresponse(res, 200, { home: 'path'});
};

module.exports.status = function(req, res) {
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