var cfg        = require('config.json')('./config.json');
var express    = require('express');
var router     = express.Router();

router.post('/add/user', function(req, res, next) {

	if (Object.keys(req.query).length < 14) {
		console.log("no suficient");
	} else {
		console.log(req.query);
	}

  res.status(200).send(req.query);
});

router.post('/add/worker', function(req, res, next) {

	if (Object.keys(req.query).length < 14) {
		console.log("no suficient");
	} else {
		console.log(req.query);
	}

  res.status(200).send(req.query);
});

router.post('/list/workers', function(req, res, next) {

  res.status(200).send(req.query);
});

module.exports = router;