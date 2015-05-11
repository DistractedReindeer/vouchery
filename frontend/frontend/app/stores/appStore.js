'use strict';

var AppActions   = require('../actions/appActions');
var Dispatcher   = require('../dispatchers/dispatcher');
var constants    = require('../helpers/appConstants');
var EventEmitter = require('events').EventEmitter;
var assign       = require('object-assign');
var errorHandler = require('../helpers/errorHandler');
var authPopup    = require('../helpers/authPopup');

var SignupStore  = require('./signupStore');

var clientApi = require('../helpers/clientAPI.js');


var CHANGE_EVENT    = 'change',
    LOGOUT_EVENT    = 'logout',
    USER_AUTH_EVENT = 'user_auth',
    ERROR_EVENT     = 'error',
    CODE_SAVED_EVENT = 'code_saved',
    SHOW_MY_LINKS = 'show_my_links',
    GO_HOME = "go_home",
    ADD_CODE = "add_code",
    SHOW_FRIENDS_LINKS = 'show_friends_links';

// states and props
var _app = {
  currentUser: {},
  userState: 'pending'
};


var user = {
  username: '',
  links: [],
  myLinks:[]
};

// private methods
function fetchUser() {

}

function userLogout() {
  return new Promise(function(resolve, reject) {
    // call a apiend point to log out ? will finalize when we have backend

  });
}

function SaveCode(code) {
  code = code.URL;
  return new Promise(function(resolve, reject) {
    clientApi.postLink (code, function(){
      console.log("------------ code added to server----");
          resolve();
    });

  });
}


function fetchUserDisplayName() {
  return new Promise(function(resolve, reject) {
    clientApi.getUserDisplayName(function(data){
          resolve(data);
    });
  });
}

function fetchUserLinks() {
  return new Promise(function(resolve, reject) {
    clientApi.getMyLinks(function(data){
          resolve(data);
    });
  });
}

function fetchFriendsLinks() {
  return new Promise(function(resolve, reject) {
    clientApi.getFriendsLinks(function(data){
          resolve(data);
    });
  });
}


function deleteAccount() {
  return new Promise(function(resolve, reject) {

  })
}

function setCurrentUser(user) {
  _app.currentUser = user;
}

var AppStore = assign({}, EventEmitter.prototype, {

  getCurrentUserOnStart: function() {
    /*
    this will be run everytime app is loaded, if the user is loggedin, it will set the current user
    and so skipping the sign up page.
    */
  },

  emitError: function(message) {
    this.emit(ERROR_EVENT, message);
  },

  getUserState: function() {
    return _app.userState;
  },

  getCurrentUser: function() {
    return _app.currentUser;
  },

  addUserAuthListener: function(callback) {
    this.on(USER_AUTH_EVENT, callback);
  },

  removeUserAuthListener: function(callbacks) {
    this.removeListener(USER_AUTH_EVENT, callback);
  },

  addLogoutListener: function(callback) {
    this.on(LOGOUT_EVENT, callback);
  },

  removeLogoutListener: function(callbacks) {
    this.removeListener(LOGOUT_EVENT, callback);
  },

  addCodeSavedListener: function(callback) {
    this.on(CODE_SAVED_EVENT, callback);
  },

  removeCodeSavedListener: function(callback) {
    this.removeListener(CODE_SAVED_EVENT, callback);
  },

  addMyLinksListener: function(callback) {
    this.on(SHOW_MY_LINKS, callback);
  },

  addFriendsLinksListener: function(callback) {
    this.on(SHOW_FRIENDS_LINKS, callback);
  },
  addProfileListener: function(callback){
    this.on(GO_HOME, callback);
  },
  addCodeListener: function(callback){
    this.on(ADD_CODE, callback);
  }


});

Dispatcher.register(function(action) {

  switch(action.type) {

    case constants.APP_AUTHENTICATE:
      //------------- TEMP WILL REMOVE -----------------

      fetchUserDisplayName().then(function(result){
        console.log("---------- fetched user name --------" + result);
            user.username = result.userDisplayName;
           setCurrentUser(user);

          //------------- TEMP WILL REMOVE -----------------

          console.log("******* inside of appstore *********");
          _app.userState = true;
          AppStore.emit(USER_AUTH_EVENT);
      });


      break;

    case constants.APP_LOGOUT:
      userLogout().then(function(result) {
        AppStore.emit(LOGOUT_EVENT);
      }, errorHandler );
      break;
    case constants.SAVE_NEW_CODE:
      console.log("************ GOT HERE ******** ")
      SaveCode(action.newCode).then(function(resp) {
        console.log("%%%%%%%% CODE SAVED %%%%%%%%");
        AppStore.emit(CODE_SAVED_EVENT);
      }, errorHandler);
      break;

    case constants.FETCH_MY_LINKS:
      console.log("------- fetch my link clicked (inside of store)-------- ");
      // fetch all the links
      fetchUserLinks().then(function(data){
        console.log("*** linked returned by teh server");
        console.dir(data);
        user.myLinks = data;
        AppStore.emit(SHOW_MY_LINKS);
      });
      break;

    case constants.FETCH_FRIENDS_LINKS:
      console.log("------- fetch friends clicked (inside of store)-------- ");
      // fetch all the links
      fetchFriendsLinks().then(function(data){
        console.log("*** linked returned by teh server");
        console.dir(data);
        user.links = data;
        AppStore.emit(SHOW_FRIENDS_LINKS);
      });
      break;

    case constants.PROFILE:
      console.log("returning to Profile");
      AppStore.emit(GO_HOME);
      break;

    case constants.ADDCODE:
      console.log("go to addcode page");
      AppStore.emit(ADD_CODE);
      break;

    default: break;
  }
});

module.exports = AppStore;
