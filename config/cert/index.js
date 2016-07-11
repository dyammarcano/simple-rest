var fs             = require('fs');

module.exports.cert = {
  key: fs.readFileSync(__dirname + '/server.key', 'utf8'),
  cert: fs.readFileSync(__dirname + '/server.crt', 'utf8')
}