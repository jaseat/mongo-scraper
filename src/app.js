var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');

var mongoose = require('./connection');

var htmlRouter = require('./routes/html');

var app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('tiny'));

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir:path.join(__dirname, 'views/partials'),
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', htmlRouter);

app.listen(PORT);