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
  },
  body: {
    type: String,
    required: true,
  },
});

module.exports = commentSchema;