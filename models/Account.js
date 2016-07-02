var mongoose   = require('mongoose');
var crypto     = require('crypto');

/*
role
first_name
second_name
first_surname
second_surname
password
identification
email
age
phone
birth_date
title
department
employee_number
works_from
*/

var AccountSchema = new mongoose.Schema({
  role: {
    type: Number,
    required : true
  },
  first_name: String,
  second_name: String,
  first_surname: String,
  second_surname: String,
  password: {
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
    type: Number, min: 18, max: 65 
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

AccountSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

AccountSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Account', AccountSchema);