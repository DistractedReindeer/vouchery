var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var passport = require('passport');
var auth = require('./server/authentication/authentication.js');
var session = require('express-session');
var db = require('./server/database/config.js');
fs = require('fs')

var app = express();
app.use(session({secret: 'supersecretkey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
auth(app, passport);


app.use(express.static(__dirname + '/public/client'));

module.exports = app;
