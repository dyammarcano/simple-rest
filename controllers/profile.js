var User     = require('../models/account');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/*module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }
};*/

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