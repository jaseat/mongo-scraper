var mongoose = require('../connection');
var Schema = mongoose.Schema;

var commentSchema = require('./Comments');

var articleSchema = new Schema({
  headline: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  comments: [commentSchema],
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;