var Sequelize = require('sequelize');
//Setting up ORM for sqlite
var orm = new Sequelize('promo', 'root', '', {
	host:'localhost',
	dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
  storage: './server/db/db.sqlite'
});

//defining User Model
var User = orm.define('User', {
	fbName: Sequelize.STRING,
	fbID: Sequelize.STRING,
	fbToken: Sequelize.STRING,
	fbEmail: Sequelize.STRING,
	fbPicture: Sequelize.STRING,

});

//defining Link Model
var Link = orm.define('Link', {
	promoLink: Sequelize.STRING,
	fbName: Sequelize.STRING,
	fbID: Sequelize.STRING,
	fbEmail: Sequelize.STRING,
	fbPicture: Sequelize.STRING,
	linkThumbnail: Sequelize.STRING,
	UserId: Sequelize.STRING,

});

//defining FriendListe Model
var FriendsList = orm.define('FriendsList',{
	friendAiD: Sequelize.STRING,
	friendBiD: Sequelize.STRING,
	friendAEmail: Sequelize.STRING,
	friendBEmail: Sequelize.STRING
});

//describing relationships
User.hasMany(Link);
Link.belongsTo(User);

//sync models with database
User.sync();
Link.sync();
FriendsList.sync();

exports.User = User;
exports.Link = Link;
exports.FriendsList = FriendsList;