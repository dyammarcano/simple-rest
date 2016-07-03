var cfg        = require('config.json')('../config.json');
var Mongoose   = require('mongoose');
var crypto     = require('crypto');
var moment     = require('moment');
var jwt        = require('jsonwebtoken');

require('./db');

var AccountSchema = new Mongoose.Schema({
  role: {
    type: Number
  },
  first_name: String,
  second_name: String,
  first_surname: String,
  second_surname: String,
  hash: {
  	type: String,
    unique: true,
    required : true
  },
  salt: {
    type: String,
    unique: true,
    required : true
  },
  identification: {
    type: Number,
    unique: true,
    required : true
  },
  email: {
    type: String,
    unique: true,
    required : true
  },
  age: { 
    type: Number,
    min: 18,
    max: 65
  },
  phone:  Number,
  birth_date:  Date,
  title:  String,
  department:  {
    type: String,
    required : true
  },
  employee_number: {
    type: Number,
    required : true
  },
  works_from: Date,
  created: { 
    type: Date, 
    default: Date.now() 
  },
});

AccountSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  // error buffer ???
  //this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  this.hash = password;
};

AccountSchema.methods.validPassword = function(password) {
  //var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  //return this.hash === hash;
  return password === this.hash;
};

AccountSchema.methods.addRole = function(code) {
  this.role = code;
};

AccountSchema.methods.generateJwt = function() {
  return jwt.sign({
    _id: this._id,
    email: this.email,
    exp: moment().add(7, 'days').valueOf(),
  }, "bf0a31b94875704e24d930f7be8c98324d930f7be8c98");
};

module.exports = Mongoose.model('Account', AccountSchema);