var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('home', {
    articles: [
      {
        headline: 'Test',
        summary: 'testing',
        url: 'http://www.google.com',
      },
      {
        headline: 'Test2',
        summary: 'testing',
        url: 'google.com',
      },
      {
        headline: 'Test3',
        summary: 'testing',
        url: 'google.com',
      },
    ]
  });
})

module.exports = router;