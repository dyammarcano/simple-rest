var passport       = require('../config/passport');
var User           = require('../models/account');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  if(Object.keys(req.query).length > 10) {

    var data = req.query;

    var user = new User();

    // check if user have access to the system or only a worker
    if (data.password !== undefined) {
      user.addRole(data.role);         // role admin
      user.setPassword(data.password); // password hash 

      console.log("admin user valid: " + user.validPassword(data.password));
    } else {
      console.log("normal user");
    }

    user.first_name      = data.first_name;
    user.second_name     = data.second_name;
    user.first_surname   = data.first_surname;
    user.second_surname  = data.second_surname;
    user.identification  = data.identification;
    user.email           = data.email;
    user.age             = data.age;
    user.phone           = data.phone;
    user.birth_date      = Date(data.birth_date);
    user.title           = data.title;
    user.department      = data.department;
    user.employee_number = data.employee_number;
    user.works_from      = data.works_from;

    user.save(function(err) {
      if (err) {
        sendJSONresponse(res, 200, { "error" : err });
        throw err;
      }
      var token = user.generateJwt();
      sendJSONresponse(res, 200, { "token" : token });
    });
  } else {
    sendJSONresponse(res, 400, { "error": "All fields required fileds: " + Object.keys(req.query).length });
    return;
  }
};

module.exports.login = function(req, res) {

  if(Object.keys(req.query).length > 1) {
    
    var data = req.query;

    var user = new User();
  
    passport.authenticate('local', function(err, user, info) {

      // If passport throws/catches an error
      if (err) {
        sendJSONresponse(res, 404, { "error" : err });
        return;
      }
      
      if(user) {
        // If a user is found
        var token = user.generateJwt();
        sendJSONresponse(res, 200, { "token" : token });
      } else {
        // If user is not found
        sendJSONresponse(res, 401, info);
      }
    });
  }
};