// //var FacebookStrategy = require('passport-facebook').Strategy;
// var FacebookTokenStrategy = require('passport-facebook-token');
// var db = require('../db');
// var request = require("request");

// var expressJwt = require('express-jwt');
// var jwt = require('jsonwebtoken');

// var configAuth = require('./auth.js');

// module.exports = function(passport) {


//     // used to serialize the user for the session
//   //   passport.serializeUser(function(user, done) {
//   //       done(null, 'a');
//   //   });

//   //   // used to deserialize the user
//   //   passport.deserializeUser(function(id, done) {
// 		// done(null, 'b')
//   //   });

// 	passport.use(new FacebookStrategy({

//         clientID        : configAuth.facebookAuth.clientID,
//         clientSecret    : configAuth.facebookAuth.clientSecret,
//         callbackURL     : configAuth.facebookAuth.callbackURL
// 	},

// 	function(token, refreshToken, profile, done){

// 		process.nextTick(function(){
// 			console.log(profile);
// 			db.User.findOrCreate({where: {fbID: profile.id, fbName: profile.displayName}})
// 				.then(function(user){

// 					db.User.update({fbToken: token}, {where:{fbID: profile.id}})
// 						.then( function(){

// 							request("https://graph.facebook.com/me/friends?access_token="+token, function(error, response, body) {
// 								var results = JSON.parse(body).data.map(function(user){
// 									return user.id;
// 								});					
// 								console.log("results",results);

// 								results.forEach(function(ele){
// 									console.log(profile.id, ele);
// 									db.FriendsList.findOrCreate({where:{friendAiD:profile.id.toString(), friendBiD:ele}});
// 								});

// 							});
// 							return done(null, user);

// 						})
// 				})
// 			});
// 	}));

// 	// passport.use(new FacebookTokenStrategy({
//  //    	clientID: configAuth.facebookAuth.clientID,
//  //    	clientSecret: configAuth.facebookAuth.clientSecret
//  //  	},
//  //  	function(accessToken, refreshToken, profile, done) {
//  //  		db.User.findOrCreate({where: {fbID: profile.id}})
//  //  			.then(function(user){

//  //  				db.User.update({fbToken: token}, {where:{fbID: profile.id}})
//  //  					.then( function(){

//  //  						request("https://graph.facebook.com/me/friends?access_token="+token, function(error, response, body) {
//  //  							var results = JSON.parse(body).data.map(function(user){
//  //  								return user.id;
//  //  							});					
//  //  							console.log("results",results);

//  //  							results.forEach(function(ele){
//  //  								console.log(profile.id, ele);
//  //  								db.FriendsList.findOrCreate({where:{friendAiD:profile.id.toString(), friendBiD:ele}});
//  //  							});

//  //  						});	
//  //  					})
//  //  				return done(null, user);
//  //  			});
//  //  	}
// 	// ));


// };