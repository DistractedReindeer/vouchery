'use strict';

var Dispatcher = require('../dispatchers/dispatcher.js');
var constants = require('../helpers/appConstants.js');

var SignupPageActions = {

  toggleAgreement: function(checked) {
    Dispatcher.dispatch({
      type    : constants.TOGGLE_AGREEMENT,
      checked : checked
    });
    console.log("----------------- toggleAgreement***inside of signup action ----------------");
    console.dir(checked);
  },

  tryToSignup: function() {
    Dispatcher.dispatch({
      type: constants.TRY_TO_SIGNUP
    });
  }
};

//
module.exports = SignupPageActions;