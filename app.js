var cfg            = require('config.json')('./config.json');
var express        = require('express');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var logger         = require('morgan');
var http           = require('http');
//var session        = require('express-session');
var network        = require('os').networkInterfaces();
//var override       = require('method-override');
//var FileStore      = require('session-file-store')(session);
var routes         = require('./routes');  
var sync           = require('./services/sync');  
var auth           = require('./middlewares/authentication'); 

sync.service(network.eth0[0], cfg);

mongoose.connect(cfg.db.url + cfg.db.name);

mongoose.connection.once('connected', function() {
	console.log("Connected to database");
});

var app = express();

app.use('/', routes);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(override());
app.disable('x-powered-by');
app.use(auth);

/*app.use(session({
	store: new FileStore({
		path: 'tmp/sessions',
		ttl: 7200,
		encrypt: true
	}),
  secret: cfg.secret,
  resave: true,
  saveUninitialized: true
}));*/

var port = cfg.port;
app.set('port', port);

var server = http.createServer(app);
server.listen(port);

console.log("Rest Server API listening on localhost:%s", port);
