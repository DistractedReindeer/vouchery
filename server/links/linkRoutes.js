var linksController = require('./linkController.js')

module.exports = function(app) {

	//Server receives request for user's posted links
	app.get('/myLinks', linksController.fetchMyLinks);

	//Server receives request for links of user's friends
	app.get('/friendsLinks', linksController.fetchFriendsLinks);

	//server receives post request when user submits link
	app.post('/newLink', linksController.postLink);

}