var cfg            = require('config.json')('./config.json');
var Express        = require('express');
var Mongoose       = require('mongoose');
var BodyParser     = require('body-parser');
var Logger         = require('morgan');
var Http           = require('http');
var network        = require('os').networkInterfaces();
var Routes         = require('./routes'); 
var Secure         = require('./routes/api');  
var Sync           = require('./services/sync');  

sync.service(network.eth0[0], cfg);

Mongoose.connect(cfg.db.url + cfg.db.name);

Mongoose.connection.once('connected', function() {
	console.log("Connected to database");
});

var app = Express();

app.use('/', Routes);
app.use('/api', Secure);

app.use(Logger('dev'));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');

var port = cfg.port;
app.set('port', port);

var server = Http.createServer(app);
server.listen(port);

console.log("Rest Server API listening on localhost:%s", port);
