var mongoose   = require('mongoose');
var account    = require('../models/account');
var session    = require('../models/session');

module.exports = function (data) {

	account.findOne({ username: data.username }, function (err, user) {
		if (err) {
			throw err;
		}

		var token;

		user.comparePassword(data.password, function (err, valid) {
			if (err) {
				throw err;
			} else {
				token = session.generateToken();
				var sess = new Session({ token: token });
			}
			return token;
		});
	});
};