var  FacebookTokenStrategy = require('passport-facebook-token');
var request = require("request");

var db = require('../db');
var configAuth = require('./auth.js');


module.exports = function(passport) {

	passport.use(new FacebookTokenStrategy({
		clientID : configAuth.facebookAuth.clientID,
		clientSecret : configAuth.facebookAuth.clientSecret
	}, function(accessToken, refereshToken, profile, done) {
				console.log("###############################################");
				console.log(profile.emails[0].value);
				console.log(profile.photos[0].value);

		//find or create User 
		db.User.findOrCreate({where: {fbID: profile.id, fbName: profile.displayName, fbEmail: profile.emails[0].value}})
			.then(function(user){

				//update Token if empty, or different
				db.User.update({fbToken: accessToken}, {where:{fbEmail: profile.emails[0].value}})
					.then( function(){
						request("https://graph.facebook.com/me/friends?access_token="+accessToken, function(error, response, body) {
							//after making fb api call, store list of friends fbid in results
							var results = JSON.parse(body).data.map(function(user){

								//return user.id;
								console.log("------------------------------------------- emial -> " + user.emails[0].value);

								return user.emails[0].value.toString();
							});					
							//store friends of user in database
							results.forEach(function(ele){
								db.FriendsList.findOrCreate({where:{friendAEmail:profile.emails[0].value.toString(), friendBEmail:ele}});
							});
						});

						return done(null, user);
					})
			});

	}
	));
}