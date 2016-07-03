var mongoose   = require('mongoose');

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