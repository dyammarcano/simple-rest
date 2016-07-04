var express        = require('express');
var jwt            = require('express-jwt');
var http           = require('http');
var morgan         = require('morgan');
var routes         = require('./routes'); 
var cfg            = require('./config'); 
var local          = require('./routes/local'); 
var passport       = require('./config/passport');
var sync           = require('./services/sync');

require('./config/db');

var app = express();

app.use(jwt({
	secret: cfg.secret
}).unless({ path: ['/api/login', '/api/register', '/system', '/api/status'] }));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.send({ token: 'invalid' });
  }
});

app.use(morgan('dev'));
app.use(passport.initialize());
app.disable('x-powered-by');

app.use('/system', local);
app.use('/api', routes);

var port = cfg.port;
app.set('port', port);

var server = http.createServer(app);
server.listen(port);

console.log("Rest Server API listening on localhost:%s", port);
