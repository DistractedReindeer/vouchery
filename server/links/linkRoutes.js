var linksController = require('./linkController.js')

/**
 * Links Controller Router 
 * @method exports
 * @param {} app
 * @param {} passport
 * @return 
 */
module.exports = function(app, passport) {

	//Authenticate any requests that reach this route
	app.use('/', passport.authenticate('facebook-token', {session:false}));

	/** call relevant linksController methods for different routes**/
	app.get('/myLinks', linksController.fetchMyLinks);
	app.get('/friendsLinks', linksController.fetchFriendsLinks);
	app.post('/newLink', linksController.postLink);
	app.get('/userDisplayName', linksController.fetchUserName);


}
