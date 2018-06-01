var mongoose = require('../connection');
var Schema = mongoose.Schema;

var commentSchema = require('./Comments');

var articleSchema = new Schema({
  headline: {
    type: String,
    required: true,
    unique: true,
  },
  summary: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  scrapeDate: {
    type: Date,
    default: Date.now(),
  },
  comments: [commentSchema],
});

// articleSchema.pre("save", function(next) {
//   mongoose.models["Article"].findOne({ headline: this.headline}, function(err, article){
//     console.log(article.headline);
//     if(article){
//       this.invalidate("headline", "article must be unique");
//     }
//     next();
//   })
// });

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;