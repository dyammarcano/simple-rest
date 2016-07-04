var cfg            = require('../config'); 
var mongoose       = require('mongoose');
var crypto         = require('crypto');
var moment         = require('moment');
var jwt            = require('jsonwebtoken');


var AccountSchema = new mongoose.Schema({
  role: {
    type: Number,
    sparse: true
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
  title: {
    type: String,
    required : true
  },
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

AccountSchema.methods.generateUser = function(data) {
  this.first_name      = data.first_name;
  this.second_name     = data.second_name;
  this.first_surname   = data.first_surname;
  this.second_surname  = data.second_surname;
  this.identification  = data.identification;
  this.email           = data.email;
  this.age             = data.age;
  this.phone           = data.phone;
  this.birth_date      = data.birth_date;
  this.title           = data.title;
  this.department      = data.department;
  this.employee_number = data.employee_number;
  this.works_from      = data.works_from;
};

AccountSchema.methods.generateAdmin = function(data) {
  this.role            = data.role;
  this.first_name      = data.first_name;
  this.second_name     = data.second_name;
  this.first_surname   = data.first_surname;
  this.second_surname  = data.second_surname;
  this.identification  = data.identification;
  this.email           = data.email;
  this.age             = data.age;
  this.phone           = data.phone;
  this.birth_date      = data.birth_date;
  this.title           = data.title;
  this.department      = data.department;
  this.employee_number = data.employee_number;
  this.works_from      = data.works_from;
  this.salt            = crypto.randomBytes(16).toString('hex');
  this.password        = crypto.pbkdf2Sync(data.password, this.salt, 1000, 64).toString('hex');
};

AccountSchema.methods.generateJwt = function() {
  return jwt.sign({
    id:            this._id,
    email:         this.email,
    first_name:    this.first_name,
    first_surname: this.first_surname,
    department:    this.department,
    role:          this.role,
    status:        this.status,
    exp:           moment().add(7, 'days').valueOf(),
  }, cfg.secret);
};

module.exports = mongoose.model('Account', AccountSchema);