var db = require('../db');


module.exports = { 

	fetchMyLinks: function(req, res, next){

		var user = req.user[0].dataValues.fbID;
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
									// console.log(ele.dataValues);
									// var userName;
									// db.User.findOne({where: {id: ele.dataValues.UserId}}).
									// then(function(user){
									// 	userName = user.dataValues.fbName;
									// 	console.log("***");
									// 	console.log(user.dataValues.fbName);
									// });
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