'use strict';

var Dispatcher = require('../dispatchers/dispatcher');
var constants  = require('../helpers/appConstants');

var AppActions = {

  authenticate: function() {
    Dispatcher.dispatch({
      type: constants.APP_AUTHENTICATE
    });
    console.log("----------------- INSIDE OF appaciton for auth ----------------");
  },

  logout: function() {
    Dispatcher.dispatch({
      type : constants.APP_LOGOUT
    });
  },

  myLink: function() {
    Dispatcher.dispatch({
      type : constants.FETCH_MY_LINKS
    });
  },

  getFriendsLinks: function() {
    Dispatcher.dispatch({
      type: constants.FETCH_FRIENDS_LINKS
    })
  },

  profile: function() {
    Dispatcher.dispatch({
      type: constants.PROFILE
    })
  },

  saveCode: function(newCode) {
    Dispatcher.dispatch({
      type: constants.SAVE_NEW_CODE,
      newCode: newCode
    });
    console.log("----------------- INSIDE OF SAVE CODE ----------------");
    console.dir(newCode);
  },


  deleteUser: function(checked) {
    Dispatcher.dispatch({
      type : constants.APP_DELETE
    });
  }

};

module.exports = AppActions;
