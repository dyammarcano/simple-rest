var disk = require('diskusage');
 
module.exports = disk.check('/', function(err, info) {
	return info;
});