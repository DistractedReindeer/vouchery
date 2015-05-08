'use strict';

var SignupPageActions = require('../actions/signupPageActions');
var Dispatcher        = require('../dispatchers/dispatcher');
var constants         = require('../helpers/appConstants');
var EventEmitter      = require('events').EventEmitter;
var assign            = require('object-assign');

var CHANGE_EVENT = 'change',
    USER_DECLINE = 'user_decline',
    SIGNUP_EVENT = 'try_to_signup';

// states and props
var _signupPage = {
  agreement : false,
  updating  : false
};


 // methods to change states and props
var signupStore = assign({}, EventEmitter.prototype, {

  getState: function() {
    return _signupPage;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addSignupListener: function(callback) {
    this.on(SIGNUP_EVENT, callback);
  },

  removeSignupListener: function(callback) {
    this.removeListener(SIGNUP_EVENT, callback);
  },

  addUserDeclineListener: function(callback) {
    this.on(USER_DECLINE, callback);
  },

  removeUserDeclineListener: function(callback) {
    this.removeListener(USER_DECLINE, callback);
  },

  toggleAgreement: function(checked) {
    _signupPage.agreement = checked;
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// action callbacks /
Dispatcher.register(function(action) {

  switch(action.type) {
    case constants.TOGGLE_AGREEMENT: 
      signupStore.toggleAgreement(action.checked);
      signupStore.emitChange();
      break;

    case constants.TRY_TO_SIGNUP:
      signupStore.emit(SIGNUP_EVENT);
    default:
      break;
  }
});

module.exports = signupStore;