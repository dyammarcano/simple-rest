var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var Security = new Schema({
  token: {
    type: String,
    unique: true,
    required : true
  },
  expireAt: { 
    type: Date, 
    required : true,
    default: Date.now + 14400
  },
});

module.exports = mongoose.model('Security', Security);