var validate   = require('../controllers/authentication');
var profile    = require('../controllers/profile');
var express    = require('express');
var router     = express.Router();

router.post('/register', validate.register);

router.post('/login', validate.login);

router.get('/profile', profile.home);

router.get('/status', profile.status);

module.exports = router;