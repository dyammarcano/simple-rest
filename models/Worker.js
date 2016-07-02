var mongoose   = require('mongoose');

/*
first_name
second_name
first_surname
second_surname
identification
age
phone
birth_date
title
department
employee_number
works_from
*/

var WorkerSchema = new mongoose.Schema({
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
	created: { 
		type: Date, 
		default: Date.now 
	},
});

module.exports = mongoose.model('Worker', WorkerSchema);