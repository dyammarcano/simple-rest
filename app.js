var cfg            = require('config.json')('./config.json');
var Express        = require('express');
var http           = require('http');
var morgan         = require('morgan');
var network        = require('os').networkInterfaces();
var routes         = require('./routes'); 
var passport       = require('./config/passport');
var sync           = require('./services/sync');

sync.service(network.eth0[0], cfg);


var app = Express();

app.use(morgan('dev'));
app.use(passport.initialize());
app.disable('x-powered-by');

app.use('/api', routes);

var port = cfg.port;
app.set('port', port);

var server = http.createServer(app);
server.listen(port);

console.log("Rest Server API listening on localhost:%s", port);
