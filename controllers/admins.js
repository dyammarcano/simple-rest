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

// route /api/account/admin/:id*?
module.exports.profile = function(req, res) {

  if (req.params.id !== undefined) {

    User.findById(req.params.id, cfg.patern.hide, function (err, admin) {
      if (err) {
        throw err;
      }
      sendJSONresponse(res, 200, admin);
    });
  } else {
    User.findById(req.user.id, cfg.patern.hide, function (err, admin) {
      if (err) {
        throw err;
      }
      sendJSONresponse(res, 200, admin);
    });
  }
};

// route /api/account/admins/all
module.exports.all = function(req, res) {

  mamageRoles();

  User.find({}, cfg.patern.hide, function (err, admin) {
    if (err) {
      throw err;
    }
    sendJSONresponse(res, 200, admin);
  });
};

// route /api/account/admin/add
module.exports.add = function(req, res) {

  mamageRoles();

  User.find({}, cfg.patern.hide, function (err, admin) {
    if (err) {
      throw err;
    }
    sendJSONresponse(res, 200, admin);
  });
};

// route /api/account/admin/update/:id
module.exports.update = function(req, res) {

  mamageRoles();

  User.find({}, cfg.patern.hide, function (err, user) {
    if (err) {
      throw err;
    }
    sendJSONresponse(res, 200, user);
  });
};

// route /api/account/admin/delete/:id
module.exports.delete = function(req, res) {

  mamageRoles();

  User.find({}, cfg.patern.hide, function (err, admin) {
    if (err) {
      throw err;
    }
    sendJSONresponse(res, 200, admin);
  });
};

// route /api/account/admin/suspend/:id
module.exports.suspend = function(req, res) {

  mamageRoles();

  User.find({}, cfg.patern.hide, function (err, admin) {
    if (err) {
      throw err;
    }
    sendJSONresponse(res, 200, admin);
  });
};