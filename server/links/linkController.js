var db = require('../db');


module.exports = { 

	fetchMyLinks: function(req, res, next){

		//todo: change user to reflect fbID of user
		var user = req.headers.id;
		console.log(req.headers.id);
		db.User.findOne({where: {fbID: user}})
			.then(function(user) {
				db.Link.findAll({where: 
					{
						UserId: user.dataValues.id
					}
				}).then(function(results){
					res.json(results.map(function(element){
						return element.promoLink;
					}));
				});
			});
	},

	fetchFriendsLinks: function(req, res, next){
		var user = req.headers.id;

		db.FriendsList.findAll({where:{friendAiD: user}})
			.then(function(friends){

				friends = friends.map(function(friend){
					return friend.dataValues.friendBiD;
				});
				console.log(friends);

				var postedLinks = [];

				friends.forEach(function(friendId){
					console.log(friendId);
					db.User.findOne({where: {fbID: friendId}})
						.then(function(user) {
							db.Link.findAll({where: 
								{
									UserId: user.dataValues.id
								}
							}).then(function(result){
								postedLinks = postedLinks.concat(result.map(function(ele){return ele.dataValues.promoLink}));
								res.json(postedLinks);
							});
						});
				});	
			});
		//convert friend names to userid
		//find all links given list of userid


	},

	postLink: function(req, res, next){

		var link = req.body.link;
		var fbID = req.body.fbID;


		db.User.findOrCreate({where: {fbID: fbID}})
			.then(function(user){
				db.Link.findOrCreate({where: 
					{
						UserId: user[0].dataValues.id,
						promoLink: link
					}
				}).then(function(results){
					res.sendStatus(201);
				});
			});
	}

};