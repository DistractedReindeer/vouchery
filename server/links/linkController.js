var db = require('../db');


module.exports = { 

	//--------- sorry I should move this, cheng -------------
	fetchUserName: function(req, res, next){
		console.log("*** got to the server");
		var user = req.user[0].dataValues.fbID;
		db.User.findOne({where: {fbID: user}})
			.then(function(user) {
				res.json({userDisplayName : user.fbName});
			});
	},


	fetchMyLinks: function(req, res, next){

		var user = req.user[0].dataValues.fbID;
		console.log(user);
		var userDisplayName = '';
		db.User.findOne({where: {fbID: user}})
			.then(function(user) {
				console.log(user);
				db.Link.findAll({where: 
					{
						UserId: user.dataValues.id
					}
				}).then(function(results){

					res.json(results.map(function(element){
						return {
							promoLink: element.promoLink,
							updatedAt: element.updatedAt
						}
					}));
				});
			});
	},

	fetchFriendsLinks: function(req, res, next){
		var user = req.user[0].dataValues.fbID;

		db.FriendsList.findAll({where:{friendAiD: user}})
			.then(function(friends){

				friends = friends.map(function(friend){
					return friend.dataValues.friendBiD;
				});

				var postedLinks = [];

				friends.forEach(function(friendId){

					db.User.findOne({where: {fbID: friendId}})
						.then(function(user) {
							db.Link.findAll({where: 
								{
									UserId: user.dataValues.id
								}
							}).then(function(result){

								postedLinks = postedLinks.concat(result.map(function(ele){
									return {
										userName: ele.dataValues.fbName,
										promoLink: ele.dataValues.promoLink,
										updatedAt: ele.dataValues.updatedAt
									};
								}));


								res.json(postedLinks);
							});
						});
				});	
			});


	},

	postLink: function(req, res, next){

		var link = req.body.link;
		var fbID = req.user[0].dataValues.fbID;
		console.log("***************************************************");
		console.log(req.body);

		db.User.findOrCreate({where: {fbID: fbID}})
			.then(function(user){
				db.Link.findOrCreate({where: 
					{
						fbName: user[0].dataValues.fbName,
						UserId: user[0].dataValues.id,
						promoLink: link
					}
				}).then(function(results){
					res.sendStatus(201);
				});
			});
	}

};