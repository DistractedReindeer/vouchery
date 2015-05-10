'use strict';

/** @jsx React.DOM */

var React  = require('react');
var Router = require('react-router');
var ProfileStore = require('../../../stores/profileStore');

var ProfilePage = React.createClass({

  mixins: [Router.Navigation, Router.States],

  getInitialState: function() {
    return {
      //username : 'TEST USER',
      username : this.props.user.username,
      allLinks: this.props.user.links,
      userpic  : ''
    }
  },

  componentWillMount: function() {
      //********* FETCH ALL THE LINKS THAT BELONG TO THE USER************* 
      ProfileStore.fetchAllLinks(this.state.username);
  },

  componentDidMount: function() {
    ProfileStore.addOnGetLinksListener(this._onGetLinks);
  },

  componentWillUnmount: function() {
    ProfileStore.removeOnGetLinksListener(this._onGetLinks);
  },

  render: function() {
    console.log("##################################### list of all links");
    console.dir(this.state.allLinks);
    var allUserLinks = this.state.allLinks.map(function(item){
      return (
        <p>{item}</p>
        );
    });
  
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
          <p>{this.state.username}</p>
          {allUserLinks}
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

  _goToAddCode: function() {
    this.transitionTo('addCode');
  },

});

module.exports = ProfilePage;