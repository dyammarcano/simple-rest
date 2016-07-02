var cfg        = require('config.json')('./config.json');
var express    = require('express');
var router     = express.Router();
var Validate   = require('../middlewares/Validate');

router.get('/', function(req, res, next) {
  console.log(req);
  res.status(200).send(cfg.api);
});

router.get('/status', function(req, res, next) {
  res.status(200).json(cfg.api);
});

router.post('/auth', function(req, res, next) {

  if (Object.keys(req.query).length >= 2) {
   var p = Validate(req.query);
   res.status(200).send(p);
  } else {
    console.log("no suficient");
  }
});

module.exports = router;