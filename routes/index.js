var control        = require('../controllers/control');
var system         = require('../controllers/system');
var express        = require('express');
var router         = express.Router();


// route /api/login
router.post('/login', system.login);

// route /api/status
router.get('/status', system.status);

// route /api/info
router.get('/info', system.info);

// route /api/account/user/:id
router.get('/account/user/:id*?', control.profile);

// route /api/account/admin/:id
router.get('/account/admin/:id*?', control.profile);

// route /api/account/users/all
router.get('/account/users/all', control.allUser);

// route /api/account/admins/all
router.get('/account/admins/all', control.allAdmin);

// route /api/account/user/add
router.post('/account/user/add', control.addUser);

// route /api/account/admin/add
router.post('/account/admin/add', control.addAdmin);

// route /api/account/user/update/:id
router.post('/account/user/update/:id', control.update);

// route /api/account/admin/update/:id
router.post('/account/admin/update/:id', control.update);

// route /api/account/admin/delete/:id
router.post('/account/admin/delete/:id', control.delete);

// route /api/account/user/delete/:id
router.post('/account/user/delete/:id', control.delete);

// route /api/account/user/suspend/:id
router.post('/account/user/suspend/:id', control.suspend);

// route /api/account/admin/suspend/:id
router.post('/account/admin/suspend/:id', control.suspend);


module.exports = router;