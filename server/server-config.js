var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var passport = require('passport');
var request = require("request");

// var auth = require('./server/authentication/authentication.js');
// auth(app, passport);

var db = require('./db');
var app = express();
//app.use(cors());
app.use(passport.initialize());

app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, access_token");
    next();
});

var  FacebookTokenStrategy = require('passport-facebook-token');

passport.use(new FacebookTokenStrategy({
	clientID : '1594739344143696',
	clientSecret : 'c15e821450c1e81071e290369698a9f4'
}, function(accessToken, refereshToken, profile, done) {

	db.User.findOrCreate({where: {fbID: profile.id, fbName: profile.displayName}})
		.then(function(user){

			db.User.update({fbToken: accessToken}, {where:{fbID: profile.id}})
				.then( function(){

					request("https://graph.facebook.com/me/friends?access_token="+accessToken, function(error, response, body) {
						var results = JSON.parse(body).data.map(function(user){
							return user.id;
						});					

						results.forEach(function(ele){

							db.FriendsList.findOrCreate({where:{friendAiD:profile.id.toString(), friendBiD:ele}});
						});

					});
					return done(null, user);

				})
		});

}
));


// user link router for link request
var linkRouter = express.Router();
app.use('/api/links', linkRouter); 

// inject our routers into their respective route files
require('./links/linkRoutes.js')(linkRouter, passport);

module.exports = app;
