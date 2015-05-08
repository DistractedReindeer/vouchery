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
      URL     : '',
      CODE    : '',
      ExpirationDate : ''
    }
  },

  componentWillMount: function() {
  },
  componentDidMount: function() {
    //when api resolves , ie the code is save correctly-----> code_saved event is emmited by Appstore
    //this this._onCodeSubmited will be called , which will trigger the route change back to profile view
    AppStore.addCodeSavedListener(this._onCodeSubmited);
  },
  componentWillUnmount: function() {
    AppStore.removeCodeSavedListener(this._onCodeSubmited);
  },

  render: function() {
    return (
    <div className="container">
    <div className="row">
          <div className="col-md-12">
            <input id="siteUrl" ref="URL" type="text" placeholder="URL" className="form-control input-md" onChange={this._onUrlChange}/>
          </div>
          <div className="col-md-12">
            <input id="siteCode" ref="CODE" type="text" placeholder="CODE" className="form-control input-md" onChange={this._onCodeChange}/>
          </div>
          <div className="col-md-4">
              <button className='btn btn-lg btn-primary' type='button' onClick={this._handleSubmit}>Add Code</button>
          </div>
      </div>
    </div>
    );
  },

  _handleSubmit: function() {
      this.setState({
        URL: this.refs.URL.getDOMNode().value,
        CODE:this.refs.CODE.getDOMNode().value
      }, function(){
        console.log("****************** CODE SUBMITTED**********");
        console.dir(this.state);
        this._saveCode();   
      });

  },
  _onCodeSubmited: function() {
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

