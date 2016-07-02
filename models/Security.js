var mongoose   = require('mongoose');

var SecuritySchema = new mongoose.Schema({
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

module.exports = mongoose.model('Security', SecuritySchema);