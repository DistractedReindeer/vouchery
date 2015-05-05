'use strict';

/** @jsx react.DOM */

var React = require('react');

var AgreementCheckbox = require('./agreementCheckbox.react.jsx');
var SignUpButton      = require('./signupButton.react.jsx');

var SignupStore = require('../../../stores/signupStore');

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
    console.log("********** DID MOUNT ***************")
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

  render: function() {

    return(

      <div className="hero text-center">
        <hgroup>
            <h1 className="headline">Share products with friends</h1>        
        </hgroup>
        <div className="row">
          <AgreementCheckbox agreementChecked={this.state.agreement}/>
        </div>
        <div className="row">
          <SignUpButton updating={this.state.updating} agreementChecked={this.state.agreement}/>
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