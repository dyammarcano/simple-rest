var cfg        = require('config.json')('./config.json');
var mongoose   = require('mongoose');


var dbname = cfg.db.url + cfg.db.name;

mongoose.connect(dbname);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbname);
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

