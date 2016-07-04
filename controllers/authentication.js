var passport       = require('../config/passport');
var User           = require('../models/account');


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  if(Object.keys(req.query).length > 12) {

    var data = req.query;

    var user = new User();

    // check if user have access to the system or only a worker
    if (data.password !== undefined) {
      user.addRole(data.role);         // role admin
      user.setPassword(data.password); // password hash 

      //console.log("admin user valid: " + user.validPassword(data.password));
    } else {
      //console.log("normal user");
    }

    user.first_name      = data.first_name;
    user.second_name     = data.second_name;
    user.first_surname   = data.first_surname;
    user.second_surname  = data.second_surname;
    user.identification  = data.identification;
    user.email           = data.email;
    user.age             = data.age;
    user.phone           = data.phone;
    user.birth_date      = data.birth_date;
    user.title           = data.title;
    user.department      = data.department;
    user.employee_number = data.employee_number;
    user.works_from      = data.works_from;

    user.save(function(err) {
      if (err) {
        sendJSONresponse(res, 400, { "error" : err });
        throw err;
      }
      sendJSONresponse(res, 200, { "token" : user.generateJwt() });
    });
  } else {
    sendJSONresponse(res, 400, { "error": "All fields required" });
    return;
  }
};

module.exports.login = function(req, res) {

  if(req.query.email !== undefined && req.query.password !== undefined) {
    
    var data = req.query;

    User.findOne({ email: data.email }, function(err, user) {
      if (err) {
        sendJSONresponse(res, 400, { "error" : err });
        throw err;
      }

      if (user.validPassword(data.password)) {
        sendJSONresponse(res, 200, { "token" : user.generateJwt() });
        return;
      } else {
        sendJSONresponse(res, 400, { "authentication" : "error" });
      }
    });
  } else {
    sendJSONresponse(res, 400, { "error": "All fields required " });
    return;
  }
};