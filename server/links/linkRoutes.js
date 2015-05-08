var linksController = require('./linkController.js')

module.exports = function(app, passport) {
	//api/links/myLinks
	//Server receives request for user's posted links
	app.use('/', passport.authenticate('facebook-token', {session:false}));

	app.get('/myLinks', linksController.fetchMyLinks);

	//Server receives request for links of user's friends
	app.get('/friendsLinks', linksController.fetchFriendsLinks);

	//server receives post request when user submits link
	app.post('/newLink', linksController.postLink);

	//---- just gets user name , sorry i should move this, cheng
	app.get('/userDisplayName', linksController.fetchUserName);

}
