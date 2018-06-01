var express = require('express');
var router = express.Router();

var Article = require('../models/Articles');

router.get('/', (req, res) => {
  Article.find({}, function(err, articles) {
    res.render('home', {articles});
  });
});

router.get('/refresh', (req, res) => {
  console.log('REFRESH*****************');
  require('../scraper').scrapeBBC().then(data => {
    data.forEach( (element, idx) => {
      var article = new Article(element);
      article.save(function(err){
        console.log(idx);
        if(err) {
          console.log(err);
        }
        if(idx === data.length - 1)
          res.sendStatus(200);
      });
    });
  });
});

router.get('/:id', (req, res) => {
  Article.findById(req.params.id).exec(function(err, article){
    res.render('article', article);
  });
});


router.post('/:id/comment', (req, res) => {
  Article.findById(req.params.id).exec(function(err, article){
    article.comments.push({
      name: req.body.name,
      email: req.body.email,
      body: req.body.body,
    });
    article.save(function(err) {
      if(err){
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    })
  });
})

module.exports = router;