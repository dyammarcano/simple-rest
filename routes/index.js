var cfg        = require('config.json')('./config.json');
var express    = require('express');
var router     = express.Router();
var validate   = require('../controllers/authentication');
var profile    = require('../controllers/profile');
var jwt        = require('jsonwebtoken');

/*var auth = jwt({
  secret: cfg.secret,
  userProperty: 'payload'
});*/

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// authentication
router.post('/register', validate.register);
router.post('/login', validate.login);

// profile
router.get('/profile', profile.list);

router.get('/', function(req, res, next) {
  sendJSONresponse(res, 200, cfg.api);
});

module.exports = router;