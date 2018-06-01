var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var Handlebars = require('handlebars');

var mongoose = require('./connection');
var Article = require('./models/Articles');

var htmlRouter = require('./routes/html');

var app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('tiny'));


var hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir:path.join(__dirname, 'views/partials'),
  handlebars: Handlebars,
  helpers: {
    breaklines: function(text) {
      text = Handlebars.Utils.escapeExpression(text);
      text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
      return new Handlebars.SafeString(text);
    },
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', htmlRouter);
app.use(sassMiddleware({
  src: path.join(__dirname, 'scss'),
  dest: path.join(__dirname, 'public/css'),
  // debug: true,
  outputStyle: 'compressed',
  prefix: '/css',
}));
app.use(express.static(path.join(__dirname, 'public')))


require('./scraper').scrapeBBC().then(data => {
  data.forEach(element => {
    var article = new Article(element);
    article.save(function(err){
      // if(err) console.log(err);
    });
  });
});

app.listen(PORT);