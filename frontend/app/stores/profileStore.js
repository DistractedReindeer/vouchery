'use strict';

var Dispatcher   = require('../dispatchers/dispatcher');
var appConstants = require('../helpers/appConstants');
var EventEmitter = require('events').EventEmitter;
var assign       = require('object-assign');
var errorHandler = require('../helpers/errorHandler');
var clientApi = require('../helpers/clientAPI.js');

var events = {
  ALL_LINKS_FETCHED : 'all_links_fetched'
};

var _fetchedLinks = {
  links: []
};

var _profileDetails = {};
var _publicUsername = '';
var _userpic = '';
var _email = {};

function fetchAllLinksAJAX(fetchParams) {
  return new Promise(function(resolve, reject) {
    var url = '';
    _fetchedLinks.links = ['microsoft azure', 'digitial ocean'];

    resolve();
    // $.ajax({
    //   method: 'GET',
    //   url: url
    // }).done(function(resp) {
    //   //fetchedLinks = resp;
    //   fetchedLinks ={
    //     links: ['microsoft azure', 'digitial ocean'];
    //   }
    //   resolve(resp);
    // }).fail(function(resp) {

    //   reject(Error(resp.responseJSON.error));
    // });

  });
};

function fetchFriendsLinks() {
  return new Promise(function(resolve, reject) {
    clientApi.getFriendsLinks(function(data){
          resolve(data);
    });
  });
}


var ProfileStore = assign({}, EventEmitter.prototype, {

  getfetchedLinks: function() {
    return _fetchedLinks;
  },

  fetchAllLinks: function(fetchParams) {
    console.log("******************************* FETCH ALL LINKS**********");
    fetchAllLinksAJAX(fetchParams).then(function(resp) {
      ProfileStore.emit(events.ALL_LINKS_FETCHED);
    }, function(resp) {
       errorHandler(resp, function() {
      });
    });
  },

  addOnGetLinksListener: function(callback) {
    this.on(events.ALL_LINKS_FETCHED, callback);
  },

  removeOnGetLinksListener: function(callback) {
    this.removeListener(events.ALL_LINKS_FETCHED, callback);
  },


});



module.exports = ProfileStore;
