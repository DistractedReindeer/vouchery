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
          console.log("this prop user -------" + this.props.user);
          console.dir(this.props.user);

    return {
      //username : 'TEST USER',
      // username : this.props.user.username,
      friendsLinks: this.props.user.links,
      // userpic  : ''
    }
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

    var allFriendsLinks = this.state.friendsLinks.map(function(item){
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


    console.log('TH ESE ARE ALL YOUR FRIENDS LINKS', allFriendsLinks);

    return  (
    <div className="container profileContainer">
      <div className="row">
          <div className="col-md-7">
            <input id="textinput" name="textinput" type="text" placeholder="filter list" className="form-control input-md" />
          </div>
          <div className="col-md-4">
              <button className='btn btn-lg btn-primary' type='button' onClick={this._goToAddCode}>Add Code</button>
          </div>
      </div>
      <div className="row">
          <p>these are the latest links from your friends:</p>
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
