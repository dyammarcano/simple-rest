var mongoose   = require('mongoose');
var randomstring = require("randomstring");

var SessionSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required : true
  },
  expireAt: { 
    type: Date, 
    required : true,
    default: Date.now() + 14400
  },
});

SessionSchema.methods.generateToken = function() {
  return randomstring.generate();
};

module.exports = mongoose.model('Session', SessionSchema);