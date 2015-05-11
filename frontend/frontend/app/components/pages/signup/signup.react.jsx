'use strict';

/** @jsx react.DOM */

var React = require('react');
var AppActions    = require('../../../actions/appActions');
var SignupStore = require('../../../stores/signupStore');
var clientApi = require('../../../helpers/clientAPI.js');


var USER_AUTH_EVENT = 'user_auth'

function getSignupState() {
  return {
    agreement : SignupStore.getState().agreement,
    updating  : SignupStore.getState().updating
  };
}

var SignUp = React.createClass({
  getInitialState: function() {
    return getSignupState();
  },
  componentDidMount: function() {
    var that = this;
    //---------FB API WILL RELOCATE -----------------------
      window.fbAsyncInit = function() {
      FB.init({
        appId      : '1594739344143696',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.2'
      });
      FB.Event.subscribe('auth.login', function () {
          that.checkLoginState();
      });
      FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
        }.bind(this));
      }.bind(this);
    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  //------------------------------------------------------------

    console.log("********** DID MOUNT ***************");
    //this is ran when this part is first rendered.
    SignupStore.addChangeListener(this._onChange);
    SignupStore.addSignupListener(this._onTryToSignup);
    SignupStore.addUserDeclineListener(this._onUserDecline);
  },

  componentWillUnmount: function() {
    SignupStore.removeChangeListener(this._onChange);
    SignupStore.removeSignupListener(this._onTryToSignup);
    SignupStore.removeUserDeclineListener(this._onUserDecline);
  },

  //--------------------------- MORE FB API RELATED HELPERS---------------------------

  testAPI: function() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    });
  },
  statusChangeCallback: function(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      this.testAPI();
      var access_token =   FB.getAuthResponse()['accessToken'];
      // ------------- save token ------------
      clientApi.login(access_token);
      // ------------- trigger login action -------
      AppActions.authenticate();
    } else if (response.status === 'not_authorized') {
      console.log('error');
    } else {
      console.log( 'error');
    }
  },
  checkLoginState: function() {
    console.log("CHECKING STATUS ------------------------------");
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  },
  handleClick: function() {
    FB.login(this.checkLoginState(), {scope: 'email,user_friends'});
  },
  render: function() {
    return(

      <div className="hero text-center">
        <hgroup>
            <h1 className="headline">Share <strong> great </strong> deals with friends</h1>
        </hgroup>
        <br/>
        <br/>
        <div className="row">
          <button scope="user_friends" onClick={this.handleClick} className='btn btn-primary btn-lg btn-fb'>Login with facebook</button>

        </div>
      </div>

    );
  },

  _onChange: function() {
    console.log("******** ON CHANGE ******************* ");
    console.dir(getSignupState());
    this.setState(getSignupState());
  },

  _onUserDecline: function() {
    this.setState({updating: false});
  },

  _onTryToSignup: function() {
    this.setState({updating: true});
  }

})

module.exports = SignUp;
