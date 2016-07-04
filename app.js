var express        = require('express');
var jwt            = require('express-jwt');
var morgan         = require('morgan');
var socket         = require('socket.io');
var http           = require('http');
var routes         = require('./routes'); 
var cfg            = require('./config'); 
var local          = require('./routes/local'); 
var sync           = require('./services/sync');

require('./config/db');

var app = express();

app.use(morgan('dev'));

app.use(jwt({
	secret: cfg.secret
}).unless({ path: ['/api/login', '/system', '/socket.io', '/api/status'] }));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.send({ token: 'invalid' });
  }
});

var io = socket();
app.io = io;

io.sockets.on('connection', function (socket) {
	//console.log("socket");
  socket.emit('status', { connect: true });
});

app.disable('x-powered-by');

app.use('/system', local);
app.use('/api', routes);

var port = cfg.port;
app.set('port', port);

var server = http.createServer(app);
io.attach(server);
server.listen(port);

console.log("Rest Server API listening on localhost:%s", port);
