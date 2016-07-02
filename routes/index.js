var cfg        = require('config.json')('./config.json');
var express    = require('express');
var auth       = require('../middlewares/authentication');
//var disk       = require('../middlewares/disk'); 
var router     = express.Router();

router.get('/', function(req, res, next) {
  console.log(req);
  res.status(200).send({ 
    api: 'v1', 
    auth: '/auth', 
    version: "0.0.1",
    private: true,
  });
});

router.get('/auth', function(req, res, next) {
  res.status(200).send({ title: 'Express' });
});

router.get('/status', function(req, res, next) {
  res.status(200).json(cfg.api);
});

/*router.get('/api', auth, function(req, res, next) {
  res.status(200).send({ title: 'Express', disk: {
    available: disk.available,
    free: disk.free,
    total: disk.total
  },
});
});*/

module.exports = router;