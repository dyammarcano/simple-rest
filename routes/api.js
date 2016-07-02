var cfg        = require('config.json')('./config.json');
var express    = require('express');
var Account    = require('../models/Account');
var router     = express.Router();

router.post('/add/user', function(req, res, next) {

	if (Object.keys(req.query).length < 14) {
		console.log("no suficient");
	} else {
		console.log(req.query);
	}

	//var user = new Account({});

  res.status(200).send(req.query);
});

router.post('/add/worker', function(req, res, next) {

	if (Object.keys(req.query).length < 14) {
		console.log("no suficient");
	} else {
		console.log(req.query);
	}

	//var user = new Account({});

  res.status(200).send(req.query);
});

module.exports = router;

/*
var role            req.query.role
var first_name      req.query.first_name
var second_name     req.query.second_name
var first_surname   req.query.first_surname
var second_surname  req.query.second_surname
var password        req.query.password
var identification  req.query.identification
var age             req.query.age
var phone           req.query.phone
var birth_date      req.query.birth_date
var title           req.query.title
var department      req.query.department
var employee_number req.query.employee_number
var works_from      req.query.works_from
*/