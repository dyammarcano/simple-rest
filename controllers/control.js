var User           = require('../models/account');
var cfg            = require('../config');

var send = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var roles = function(req, res) {

  if (req.user !== undefined && req.user.role === 200) {
    return send(res, 401, { access: false });
  }
};

module.exports.profile = function(req, res) {

  if (req.params.id !== undefined) {

    User.findById(req.params.id, cfg.patern.hide, function (err, account) {
      if (err) {
        throw err;
      }
      send(res, 200, account);
    });
  } else {
    User.findById(req.user.id, cfg.patern.hide, function (err, account) {
      if (err) {
        throw err;
      }
      send(res, 200, account);
    });
  }
};

module.exports.allAdmin = function(req, res) {

  if (req.user.role !== 200) {
    
    User.find({ _id: { $ne: req.user.id }, password: { $exists: true } }, cfg.patern.hide, function (err, account) {
      if (err) {
        throw err;
      }
      send(res, 200, account);
    });
  } else {

      User.find({ department: { $eq: req.user.department }, _id: { $ne: req.user.id }, password: { $exists: true } }, cfg.patern.hide, function (err, account) {
      if (err) {
        throw err;
      }
      send(res, 200, account);
    });
  }
};

module.exports.allUser = function(req, res) {

  if (req.user.role !== 200) {
    
    User.find({ _id: { $ne: req.user.id }, password: { $exists: false } }, cfg.patern.hide, function (err, account) {
      if (err) {
        throw err;
      }
      send(res, 200, account);
    });
  } else {

      User.find({ department: { $eq: req.user.department }, _id: { $ne: req.user.id }, password: { $exists: false } }, cfg.patern.hide, function (err, account) {
      if (err) {
        throw err;
      }
      send(res, 200, account);
    });
  }
};

module.exports.addAdmin = function(req, res) {

  roles(req, res);

  var obj = new User();

  obj.generateAdmin(req.query);

  obj.save(function (err) {
    if (err) {
      send(res, 400, { "exist" : true });
    }
    send(res, 200, { "saved" : true });
  });
};

module.exports.addUser = function(req, res) {

  roles(req, res);

  var obj = new User();

  obj.generateUser(req.query);

  obj.save(function (err) {
    if (err) {
      send(res, 400, { "exist" : true });
    }
    send(res, 200, { "saved" : true });
  });
};

module.exports.update = function(req, res) {

  roles(req, res);

  User.find({}, cfg.patern.hide, function (err, user) {
    if (err) {
      throw err;
    }
    send(res, 200, user);
  });
};

module.exports.delete = function(req, res) {

  roles(req, res);

  User.find({}, cfg.patern.hide, function (err, user) {
    if (err) {
      throw err;
    }
    send(res, 200, user);
  });
};

module.exports.suspend = function(req, res) {

  roles(req, res);
  
  User.find({}, cfg.patern.hide, function (err, user) {
    if (err) {
      throw err;
    }
    send(res, 200, user);
  });
};