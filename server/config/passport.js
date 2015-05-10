var  FacebookTokenStrategy = require('passport-facebook-token');
var request = require("request");

var db = require('../db');
var configAuth = require('./auth.js');


module.exports = function(passport) {

	passport.use(new FacebookTokenStrategy({
		clientID : process.env.ClientID || configAuth.facebookAuth.clientID,
		clientSecret : process.env.ClientSecret || configAuth.facebookAuth.clientSecret
	}, function(accessToken, refereshToken, profile, done) {
		//find or create User 
		db.User.findOrCreate({where: {fbID: profile.id, fbName: profile.displayName}})
			.then(function(user){

				//update Token if empty, or different
				db.User.update({fbToken: accessToken}, {where:{fbID: profile.id}})
					.then( function(){
						request("https://graph.facebook.com/me/friends?access_token="+accessToken, function(error, response, body) {
							//after making fb api call, store list of friends fbid in results
															console.log("frineds---------------------------------------");
															console.log(JSON.parse(body).data);
																														console.log("frineds---------------------------------------");


							var results = JSON.parse(body).data.map(function(user){

								return user.id;
							});					
							//store friends of user in database
							results.forEach(function(ele){
								db.FriendsList.findOrCreate({where:{friendAiD:profile.id.toString(), friendBiD:ele}});
							});
						});

						return done(null, user);
					})
			});

	}
	));
}