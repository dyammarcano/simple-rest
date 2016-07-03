var cfg        = require('config.json')('../config.json');
var Mongoose   = require('mongoose');
var crypto     = require('crypto');
var jwt        = require('jsonwebtoken');

var AccountSchema = new Mongoose.Schema({
  role: {
    type: Number,
    required : true
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

AccountSchema.methods.setPassword = function(raw_code){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(raw_code, this.salt, 1000, 64).toString('hex');
};

AccountSchema.methods.validPassword = function(raw_code) {
  var hash = crypto.pbkdf2Sync(raw_code, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

AccountSchema.methods.addRole = function(code) {
  this.role = code;
};

AccountSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000),
  }, cfg.secret);
};

module.exports = Mongoose.model('Account', AccountSchema);