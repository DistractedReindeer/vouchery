'use strict';
//=====================================
//just a dummy server to serve the index view
//=====================================
var path         = require('path');
var express      = require('express');
var app          = express();
var bodyParser   = require('body-parser');
var session      = require('express-session');
var cookieParser = require('cookie-parser');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'assets')));

app.get('/', function(req, res) {
    res.render('app.ejs');
  });



var server = app.listen(1337, function() {
  process.title = 'dummy server to serve up the fronend app';
  process.port = server.address().port;
  console.log('App running on', server.address().port);
});