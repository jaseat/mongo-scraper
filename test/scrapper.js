var expect = require('chai').expect;
var scrapeBBC = require('../src/scrapper').scrapeBBC

describe('BBC Scraper', function() {
  describe('get articles', function() {
    it('should scrape articles from BBC', function(done) {
      this.timeout(5000);
      scrapeBBC().then(data => {
        console.log(data);
        done();
      });
    });
  });
});