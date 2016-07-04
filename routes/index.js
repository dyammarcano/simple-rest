var validate   = require('../controllers/authentication');
var user       = require('../controllers/users');
var admin      = require('../controllers/admins');
var system     = require('../controllers/system');
var express    = require('express');
var router     = express.Router();

// route /api/register
router.post('/register', validate.register);

// route /api/login
router.post('/login', validate.login);

// route /api/status
router.get('/status', system.status);

// route /api/info
router.get('/info', system.routesInfo);

// route /api/account/user/:id
router.get('/account/user/:id*?', user.profile);

// route /api/account/users/all
router.get('/account/users/all', user.all);

// route /api/account/user/add
router.get('/account/user/add', user.add);

// route /api/account/user/delete/:id
router.get('/account/user/delete/:id*?', user.delete);

// route /api/account/user/suspend/:id
router.get('/account/user/suspend/:id*?', user.suspend);

// route /api/account/admin/:id
router.get('/account/admin/:id*?', admin.profile);

// route /api/account/admins/all
router.get('/account/admins/list', admin.all);

// route /api/account/admin/add
router.get('/account/admin/add', admin.add);

// route /api/account/admin/delete/:id
router.get('/account/admin/delete/:id*?', admin.delete);

// route /api/account/admin/suspend/:id
router.get('/account/admin/suspend/:id*?', admin.suspend);


module.exports = router;