'use strict';
var Dispatcher = require('../dispatchers/dispatcher');
module.exports = function(error, callback) {
  if(error) {
    console.log("********************* ERROR **********************************");
    console.log(error.message);
  }
};