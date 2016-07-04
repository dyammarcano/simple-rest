var passport       = require('../config/passport');
var User           = require('../models/account');


var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function (req, res) {

  if(Object.keys(req.query).length > 12) {

    var obj = new User();

    // check if user have access to the system or only a user
    if (req.query.password !== undefined) {
      obj.generateAdmin(req.query); // add admin
    } else {
      obj.generateUser(req.query);  // add user      
    }

    obj.save(function (err) {
      if (err) {
        sendJSONresponse(res, 400, { "errors" : true });
        throw err;
      }
      sendJSONresponse(res, 200, { "token" : user.generateJwt() });
    });
  }
};

module.exports.login = function(req, res) {

  if(req.query.email !== undefined && req.query.password !== undefined) {

    User.findOne({ email: req.query.email }, function(err, user) {
      if (err) {
        sendJSONresponse(res, 400, { "errors" : true });
        throw err;
      }

      if (!user) {
        throw user;
      }

      if (user.validPassword(req.query.password)) {
        sendJSONresponse(res, 200, { "token" : user.generateJwt() });
      } else {
        sendJSONresponse(res, 400, { "authentication" : "error" });
      }
    });
  } else {
    sendJSONresponse(res, 400, { "error": "All fields required " });
  }
};