var cfg            = require('config.json')('./config.json');
var Express        = require('express');
var http           = require('http');
var morgan         = require('morgan');
var network        = require('os').networkInterfaces();
var routes         = require('./routes'); 
var local         = require('./routes/local'); 
var passport       = require('./config/passport');
var sync           = require('./services/sync');
var jwt            = require('express-jwt');

require('./models/db');

sync.service(network.eth0[0], cfg);

var app = Express();

app.use(jwt({
	secret: "bf0a31b94875704e24d930f7be8c98324d930f7be8c98"
}).unless({ path: ['/api/login', '/api/register', '/system'] }));

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
