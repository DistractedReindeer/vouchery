'use strict';

/** @jsx React.DOM */

var React  = require('react');
var Router = require('react-router');
var ProfileStore = require('../../../stores/profileStore');
var AppActions   = require('../../../actions/appActions');
var AppStore = require('../../../stores/appStore');


var ProfilePage = React.createClass({

  mixins: [Router.Navigation, Router.States],

  getInitialState: function() {

    return {
      friendsLinks: this.props.user.links,
      searchString: ''
    }
  },

  handleChange: function(e){

    this.setState({searchString:e.target.value});
    },


  componentWillMount: function() {
      //********* FETCH ALL THE LINKS THAT BELONG TO THE USER*************
      // ProfileStore.fetchAllLinks(this.state.username);
  },

  componentDidMount: function() {
    AppActions.getFriendsLinks();
    AppStore.addFriendsLinksListener(this._showLinks);
    // ProfileStore.addOnGetLinksListener(this._onGetLinks);
  },

  componentWillUnmount: function() {
    // ProfileStore.removeOnGetLinksListener(this._onGetLinks);
  },

  render: function() {
    console.log('FRIENDS LINKS:', this.state.friendsLinks);

    var resultLinks;

    if (this.state.searchString.length > 0) {
      var searchInput = this.state.searchString;
      resultLinks = this.state.friendsLinks.filter(function(link) {
          return link.promoLink.match(searchInput);
      });

    } else {
      resultLinks = this.state.friendsLinks;
    };

    var allFriendsLinks = resultLinks.map(function(item) {
      return (

        <div className="col-xs-12 col-sm-4">
            <div className="panel panel-default panel-google-plus">
                <div className="panel-heading">
                    <img className="img-circle pull-left fbImage" src={item.fbPicture}  />
                    <h3>{item.userName}</h3>
                    <h5><span>Shared publicly</span> - <span>{item.updatedAt}</span> </h5>
                </div>
                <div className="panel-body">
                    <a className="panel-google-plus-image" href={item.promoLink}>
                        <img src={item.linkThumbnail} />
                    </a>
                </div>
            </div>
        </div>

    );
    });

    return  (
    <div className="container profileContainer">
      <div className="row search">
          <div className="col-md-7">
            <input id="textinput" name="textinput" type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Search for a link" className="form-control input-md" />
          </div>
        
      </div>
      <div className="row">
          <div> {allFriendsLinks} </div>
      </div>
    </div>
    );

  },

  _onGetLinks: function() {
    var username = this.state.username;
    this.setState({
      username : username,
    });
  },
  _showLinks: function(){
    console.log ("$$$$$$$$$$$$$$$$$$");
    this.setState({
      friendsLinks : this.props.user.links,
    });

  },

  _goToAddCode: function() {
    this.transitionTo('addCode');
  },

});

module.exports = ProfilePage;
