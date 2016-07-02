var mongoose   = require('mongoose');
var Account    = require('../models/Account');
var Session    = require('../models/Session');

module.exports = function (data) {

	Account.findOne({ username: data.username }, function (err, user) {
		if (err) {
			throw err;
		}

		var token;

		user.comparePassword(data.password, function (err, valid) {
			if (err) {
				throw err;
			} else {
				token = Session.generateToken();
				var sess = new Session({ token: token });
			}
			return token;
		});
	});
};