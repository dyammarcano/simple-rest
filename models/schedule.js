var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var Schedule = new Schema({
	title: {
		type: String,
		required: true
	},
	schedule: {
		type: Date,
		required: true
	}
});

module.exports = mongoose.model('Schedule', Schedule);