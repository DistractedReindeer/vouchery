var Sequelize = require('sequelize');
var orm = new Sequelize('promo', 'root', '');

var User = orm.define('User', {
	fbName: Sequelize.STRING,
	fbID: Sequelize.STRING,
	fbToken: Sequelize.STRING

});

var Link = orm.define('Link', {
	promoLink: Sequelize.STRING,
	fbName: Sequelize.STRING
});

var FriendsList = orm.define('FriendsList',{
	friendAiD: Sequelize.STRING,
	friendBiD: Sequelize.STRING
});


User.hasMany(Link);
Link.belongsTo(User);

User.sync();
Link.sync();
FriendsList.sync();

exports.User = User;
exports.Link = Link;
exports.FriendsList = FriendsList;