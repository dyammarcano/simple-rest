var express        = require('express');
var jwt            = require('express-jwt');
var morgan         = require('morgan');
var Primus         = require('primus.io');
var http           = require('http');
var routes         = require('./routes'); 
var cfg            = require('./config'); 
var local          = require('./routes/local'); 
var sync           = require('./services/sync');
var system         = require('./controllers/mod');


require('./config/db');

var app = express();

app.use(morgan('dev'));

app.use(jwt({
	secret: cfg.secret
}).unless({ path: ['/api/login', '/system', '/api/status'] }));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.send({ token: 'invalid' });
  }
});

app.disable('x-powered-by');

app.use('/system', local);
app.use('/api', routes);

var port = cfg.port;
app.set('port', port);

var server = http.createServer(app).listen(port);

var primus = new Primus(server, {
	transformer: 'websockets',
	parser: 'JSON'
});

var client = primus.channel('client');
var system = primus.channel('system');

client.on('connection', function (spark) {

  spark.on('auth', function (data) {
    var state = system.auth(data);
    console.log(state);
    if (state.token === undefined) {
      spark.send('auth', state);
    }
  });

  spark.on('check', function (msg) {
    console.log(msg);
    spark.send('check', true);
  });
});

console.log("Rest Server API listening on localhost:%s", port);
