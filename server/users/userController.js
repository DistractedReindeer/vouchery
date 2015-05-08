


module.export = {

	signin: function(req, res, next) {

	},

	signup: function(req, res, next) {
		//authentication stuff 
		var _fbToken = Math.random() * 100;

		db.User.create({
			fbToken: _fbToken
		}).complete(function(err, results){
			console.log("SUCCESS", results);
			res.sendStatus(201);
		});
	},	

	checkAuth: function(req, res, next) {

	}

}