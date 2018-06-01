var cheerio = require('cheerio');
var request = require ('request');

exports.scrapeBBC = function(){
  return new Promise((resolve, reject) => {
    request('https://www.bbc.co.uk/', function(error, response, html) {
      if(error){
        return reject(error);
      }

      var $ = cheerio.load(html);

      var results = [];

      $("a.top-story").each(function(i, element){
        var source = 'BBC';
        var url = $(element).attr('href');
        var headline = 
          $(element)
            .children('div.top-story__content')
            .children('h3')
            .children('span').text();

        var image =
          $(element)
            .children('div.top-story__image-wrapper')
            .children('div.top-story__image')
            .data('lazy');
        var summary = "Summary not available";

        image = image ? "http://" + image.slice(2) : 'https://upload.wikimedia.org/wikipedia/commons/e/eb/BBC.svg'

        results.push({ headline, summary, url, source, image, });
        resolve(results);
      }); 
    });
  })
}