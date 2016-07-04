var cfg            = require('../config'); 
var mongoose       = require('mongoose');
var crypto         = require('crypto');
var moment         = require('moment');
var jwt            = require('jsonwebtoken');


var AccountSchema = new mongoose.Schema({
  role: {
    type: Number
  },
  first_name: String,
  second_name: String,
  first_surname: String,
  second_surname: String,
  password: {
    type: String,
    sparse: true
  },
  salt: {
    type: String,
    sparse: true
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
  age: Number,
  phone: String,
  birth_date: String,
  title: String,
  department: {
    type: String,
    required : true
  },
  employee_number: {
    type: Number,
    required : true
  },
  works_from: String,
  status: { 
    type: String, 
    default: 'active' 
  },
  created: { 
    type: Date, 
    default: Date.now() 
  },
});

AccountSchema.methods.setPassword = function(raw_password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(raw_password, this.salt, 1000, 64).toString('hex');
};

AccountSchema.methods.validPassword = function(raw_password) {
  return this.password === crypto.pbkdf2Sync(raw_password, this.salt, 1000, 64).toString('hex');
};

AccountSchema.methods.addRole = function(code) {
  this.role = code;
};

AccountSchema.methods.generateJwt = function() {
  return jwt.sign({
    id: this._id,
    email: this.email,
    first_name: this.first_name,
    first_surname: this.first_surname,
    department: this.department,
    role: this.role,
    status: this.status,
    exp: moment().add(7, 'days').valueOf(),
  }, cfg.secret);
};

module.exports = mongoose.model('Account', AccountSchema);