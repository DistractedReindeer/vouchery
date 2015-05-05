var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var passport = require('passport');
require('./config/passport')(passport); // pass passport for configuration

// var auth = require('./server/authentication/authentication.js');
var session = require('express-session');
var db = require('./db');

//authentication stuff
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

fs = require('fs')

var app = express();
app.use(session({secret: 'supersecretkey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// auth(app, passport);

app.use(express.static(__dirname + '/public/client'));

var userRouter = express.Router();
var linkRouter = express.Router();

// We are going to protect /api routes with JWT
app.use('/api/links/myLinks', expressJwt({secret: "secret"}));
// app.use(express.json());
// app.use(express.urlencoded());


// app.use('/api/users', userRouter); // use user router for all user request
app.use('/api/links', linkRouter); // user link router for link request

app.get('/',  function(req, res) {
  console.log('hi');
});


 app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'user_friends'}));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/tokenize',
            failureRedirect : '/login'
        }));

    app.get('/tokenize', function(req, res){
    	// We are sending the profile inside the token
    	var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });
    	res.json({ token: token });
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
