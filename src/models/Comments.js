var mongoose = require('../connection');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    // match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },
  body: {
    type: String,
    required: true,
  },
  posted: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = commentSchema;