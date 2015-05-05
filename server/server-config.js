var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var passport = require('passport');
require('./config/passport')(passport); // pass passport for configuration
var BearerStrategy = require('passport-http-bearer').Strategy
var cors = require('cors');

// var auth = require('./server/authentication/authentication.js');

var db = require('./db');




var app = express();
app.use(cors());
app.use(passport.initialize());

app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// auth(app, passport);

app.use(express.static(__dirname + '/public/client'));

var userRouter = express.Router();
var linkRouter = express.Router();

app.use('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.get('/auth/facebook', passport.authenticate('facebook', {session: false, scope: 'user_friends'}));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
    	session: false,
        // successRedirect : '/tokenize',
        failureRedirect : '/login'
    }), function(req, res){
    	console.log("*****");
    	console.log(req.user);
        res.json({token: req.user[0].dataValues.fbToken});
    	
});


// app.use('/api/users', userRouter); // use user router for all user request
app.use('/api/links', linkRouter); // user link router for link request



app.get('/',  function(req, res) {
  console.log('hi');
});


    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
// inject our routers into their respective route files
// require('./users/userRoutes.js')(userRouter);
require('./links/linkRoutes.js')(linkRouter);

module.exports = app;
