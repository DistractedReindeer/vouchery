'use strict';

/** @jsx react.DOM */

var React  = require('react');

var AppActions    = require('../../../actions/appActions');
var SignupActions = require('../../../actions/signupPageActions');

var SignUpButton = React.createClass({

  PropsType: {
    updating  : React.PropTypes.bool,
  },

  render: function() {
    var disabled = this.props.updating || !this.props.agreementChecked ? true : false;

    if(!this.props.updating) {
      return(
        <button onClick={this._onClick} disabled={disabled} className='btn btn-primary btn-lg fbButton'>Signup with Facebook</button>
      );
    } else {
      return(
        <button className='btn btn-primary btn-lg' disabled={disabled}>Signup with Facebook<i className='fa fa-refresh fa-spin'></i></button>
      );
    }
  },

  _onClick: function(){ 
    console.log("############### CLICKED ##################");
    AppActions.authenticate();
    SignupActions.tryToSignup();
  }
});

module.exports = SignUpButton;