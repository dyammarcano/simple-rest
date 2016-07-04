var User           = require('../models/account');
var cfg            = require('../config');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var mamageRoles = function(req) {

  if (req.user.role === 200) {
    return sendJSONresponse(res, 400, { access: false });
  }
};

// route /api/account/user/:id
module.exports.profile = function(req, res) {
  
  if (req.params.id !== undefined) {

    User.findById(req.params.id, cfg.patern.hide, function (err, user) {
      if (err) {
        throw err;
      }
      sendJSONresponse(res, 200, user);
    });
  } else {
    User.findById(req.user.id, cfg.patern.hide, function (err, user) {
      if (err) {
        throw err;
      }
      sendJSONresponse(res, 200, user);
    });
  }
};

// route /api/account/users/all
module.exports.all = function(req, res) {

  User.find({}, cfg.patern.hide, function (err, user) {
    if (err) {
      throw err;
    }
    sendJSONresponse(res, 200, user);
  });
};

// route /api/account/user/add
module.exports.add = function(req, res) {

  mamageRoles();

  User.find({}, cfg.patern.hide, function (err, user) {
    if (err) {
      throw err;
    }
    sendJSONresponse(res, 200, user);
  });
};

// route /api/account/user/delete
module.exports.delete = function(req, res) {

  mamageRoles();

  User.find({}, cfg.patern.hide, function (err, user) {
    if (err) {
      throw err;
    }
    sendJSONresponse(res, 200, user);
  });
};

// route /api/account/user/suspend
module.exports.suspend = function(req, res) {
  
  User.find({}, cfg.patern.hide, function (err, user) {
    if (err) {
      throw err;
    }
    sendJSONresponse(res, 200, user);
  });
};