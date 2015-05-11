'use strict';

/** @jsx React.DOM */

var React  = require('react');
var Router = require('react-router');
var AppActions      = require('../../../actions/appActions');
var AppStore = require('../../../stores/appStore');

var addCodePage = React.createClass({
  mixins: [Router.Navigation, Router.State],
  getInitialState: function() {
    return {
      COMPANY     : '',
      CODE    : '',
      EXPIRATIONDATE : ''
    }
  },

  componentWillMount: function() {
  },
  componentDidMount: function() {
    //when api resolves , ie the code is save correctly-----> code_saved event is emmited by Appstore
    //this this._onCodeSubmitted will be called , which will trigger the route change back to profile view
    AppStore.addCodeSavedListener(this._onCodeSubmitted);
  },
  componentWillUnmount: function() {
    AppStore.removeCodeSavedListener(this._onCodeSubmitted);
  },

  render: function() {
    return (
    <div className="container">
    <div className="row">
          <div className="col-md-12">
          <br/>
            <p> What company is this code for? </p>
            <input id="siteName" ref="COMPANY" type="text" placeholder="Name of company (e.g., Uber)" className="form-control input-md"/>
          </div>
          <div className="col-md-12">
          <br/>
           <p> What is the referral code? </p>
            <input id="siteCode" ref="CODE" type="text" placeholder="Referral code (e.g., ABBAHK26 or http://munchery.com/invite/ABBAHK26)" className="form-control input-md"/>
          </div>
          <div className="col-md-12">
          <br/>
            <p> When does this code expire? </p>
            <input id="codeExpiration" ref="EXPIRATIONDATE" type="text" placeholder="Expiration Date (MM/DD/YYYY or 'Never')" className="form-control input-md" />
          </div>
          <div className="col-md-4">
              <br/>
              <button className='btn btn-lg btn-primary' type='button' onClick={this._handleSubmit}>Submit Code</button>
          </div>
      </div>
    </div>
    );
  },

  _handleSubmit: function() {
      this.setState({
        COMPANY: this.refs.COMPANY.getDOMNode().value,
        CODE: this.refs.CODE.getDOMNode().value,
        EXPIRATIONDATE: this.refs.EXPIRATIONDATE.getDOMNode().value
      }, function(){
        console.log("****************** CODE SUBMITTED**********");
        console.dir(this.state);
        this._saveCode();
      });

  },
  _onCodeSubmitted: function() {
    //go back to profile view ****
    console.log("********** CODE SEND TO SERVER WOOOOOOOOOT ..almost");
    this.transitionTo('profile');
  },
  _saveCode: function(e) {
    AppActions.saveCode(this.state);
  }
});

module.exports = addCodePage;

function validateURL(url) {
  // regex : (....
  return true;
}

