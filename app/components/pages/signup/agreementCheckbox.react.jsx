'use strict';

/** @jsx react.DOM */

var React = require('react');
var SignupPageActions = require('../../../actions/signupPageActions');
var AgreementCheckbox = React.createClass({

  render: function() {

    return(
      <label> 
        <input 
          className=''
          type="checkbox"
          name='agreement'
          checked={this.props.agreementChecked}
          onChange={this._toggleCheckbox} />
        <span>
          I agree to the terms of service
        </span>
      </label>
    );
  },

  _toggleCheckbox: function(e) {
    SignupPageActions.toggleAgreement(e.currentTarget.checked);
  }
});

module.exports = AgreementCheckbox;
      