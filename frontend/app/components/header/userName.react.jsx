'use strict';

/** @jsx React.DOM */

var React  = require('react');

var DropdownButton = require('react-bootstrap').DropdownButton,
    MenuItem       = require('react-bootstrap').MenuItem;
    
var appActions = require('../../actions/appActions');

var UserName = React.createClass({

  render: function() {
    var username  = this.props.user.username || false;
    return(
      <DropdownButton title={username}>
        <MenuItem eventKey='logout' onClick={this._onUserDropDownClick.bind(this,'logout')} header={true} className='b-menu-item'>
          <span>Log Out</span>
        </MenuItem>
      </DropdownButton>
    );
  },

  _onUserDropDownClick: function(eventKey){ 
    // debugger;
    switch(eventKey) {
      case 'logout': 
        appActions.logout();
        break;
      default: break;
    }
  }
});

module.exports = UserName;