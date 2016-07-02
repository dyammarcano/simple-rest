var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var Account = new Schema({
  role: {
    type: Number,
    required : true
  },
  first_name: String,
  second_name: String,
  first_surname: String,
  second_surname: String,
  identification: {
    type: Number,
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
  register: { 
    type: Date, 
    default: Date.now 
  },
});

module.exports = mongoose.model('Account', Account);