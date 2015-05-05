'use strict';

var AppActions   = require('../actions/appActions');
var Dispatcher   = require('../dispatchers/dispatcher');
var constants    = require('../helpers/appConstants');
var EventEmitter = require('events').EventEmitter;
var assign       = require('object-assign');
var errorHandler = require('../helpers/errorHandler');
var authPopup    = require('../helpers/authPopup');

var SignupStore  = require('./signupStore');

var CHANGE_EVENT    = 'change',
    LOGOUT_EVENT    = 'logout',
    USER_AUTH_EVENT = 'user_auth',
    ERROR_EVENT     = 'error',
    CODE_SAVED_EVENT = 'code_saved';

// states and props
var _app = {
  currentUser: {},
  userState: 'pending'
};

// private methods
function fetchUser() {
  return new Promise(function(resolve, reject) {
      var user = {
        username: 'Test User',
        links:['digitial ocean', 'amazon aws','uber','lyft']
      }
      setCurrentUser(user);
      resolve(user);
    /*******************************************
    $.ajax({
      method : 'GET',
      url    : '/some-api-endpoint-to-get-user'
    }).done(function(resp) {
      setCurrentUser(resp);
      resolve(resp);
    }).fail(function(resp) {
      _app.userState = false;
      reject(Error(resp.responseJSON.error));
    });
    */

  });
}

function userLogout() {
  return new Promise(function(resolve, reject) {
    // call a apiend point to log out ? will finalize when we have backend
    $.ajax({
      method : 'GET',
      url    : '/logout'
    }).done(function(resp) {
      //set everything to null;
      _app.currentUser = {};
      _app.userState   = false;
      resolve();
    }).fail(function(resp) {
      reject(Error());
    })
  });
}

function SaveCode(privacies) {
  return new Promise(function(resolve, reject) {
    resolve();


    // $.ajax({
    //   method : 'POST',
    //   url    : '/someAPIendpoint',
    //   data   : privacies
    // }).done(function(resp) {
    //   resolve(resp);
    // }).fail(function(resp) {
    //   reject(Error());
    // });

  });
}

function deleteAccount() {
  return new Promise(function(resolve, reject) {

    $.ajax({
      method: 'DELETE',
      url: '/api/user'
    }).done(function(resp) {
      _app.currentUser = {};
      _app.userState   = false;
      resolve();
    }).fail(function(resp) {
      reject(Error());
    });

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
    // fetchUser().then(function(result) {
    //   setCurrentUser(result);
    //   _app.userState = true;
    //   AppStore.emit(USER_AUTH_EVENT);
    // }, errorHandler );
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

});

Dispatcher.register(function(action) {

  switch(action.type) {

    case constants.APP_AUTHENTICATE:
      authPopup('/routeToFacebookOauth', 'Facebook Oauth popup', function(newUserState) {
        fetchUser().then(function(result) {
          //***newUserSatate = pending , or true, when true it means a user is logged in
          _app.userState = newUserState;
          AppStore.emit(USER_AUTH_EVENT);
        }, function(result) {
          _app.userState = false;
          SignupStore.emit('user_not_authorized');
        });
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
        AppStore.emit(CODE_SAVED_EVENT);
      }, errorHandler); 

      break;
    default: break;
  }
});

module.exports = AppStore;