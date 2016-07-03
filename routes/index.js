var validate   = require('../controllers/authentication');
var profile    = require('../controllers/profile');
var express    = require('express');
var router     = express.Router();

router.post('/register', validate.register);

router.post('/login', validate.login);

router.get('/profile', profile.profile);

router.get('/status', profile.status);

//router.get('/user', profile.user);

//router.get('/admin', profile.admin);

module.exports = router;