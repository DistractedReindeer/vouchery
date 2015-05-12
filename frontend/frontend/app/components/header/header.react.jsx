'use strict';

/** @jsx React.DOM */

var React  = require('react');

var Router = require('react-router'),
    Link   = Router.Link;

var Navbar = require('react-bootstrap').Navbar,
    Nav = require('react-bootstrap').Nav,
    NavItem = require('react-bootstrap').Navbar;
var appActions = require('../../actions/appActions');

var UserName = require('./userName.react.jsx');

// var addCode = require('../pages/addCode/addCodePage.react.jsx');


var Header = React.createClass({


  render: function() {
//var currentRoutes = this.context.router.getCurrentRoutes();
var currentPath = window.location.href[window.location.href.length -1];
  console.log("--------------- CURRENT ROUTE----------> " + currentPath);
  var headerClassName = currentPath === '/' ? 'navbar_landing' : 'navbar';
  var userBlock;
  var brand;
  var addCode
  if(currentPath !== '/'){
      brand = <div className='mainLogo' eventKey="profile" onClick={this._onUserClick.bind(this, 'profile')} header={true}>
                    <img src='images/logo_black.png' className='mainLogo' eventKey="profile" onClick={this._onUserClick.bind(this, 'profile')} header={true}/>
                  </div>;
    }else{
        brand = <div className='mainLogo' eventKey="profile" onClick={this._onUserClick.bind(this, 'profile')} header={true} >
                      <img src='images/logo4.png' className='mainLogo' />
                    </div>;
    }


    if(this.props.userState == 'pending' || !this.props.userState) {
      userBlock = null;      
    } else if(this.props.userState) {
      userBlock =<ul className="nav navbar-nav navbar-right">
                  <li> <div class="btn-group"><a className='addCode btn btn-warning navbar-btn' type='button' onClick={this._onUserClick.bind(this, 'addCode')} header={true}>Add Code</a></div></li>
                  <li className='userBlock'>
                    <UserName user={this.props.user}/>
                  </li>
                </ul>
                  
    }
    return (
      <Navbar className={headerClassName} brand={brand}>
        {addCode}
        {userBlock}
        
      </Navbar>
    );
  },
  _onUserClick: function(eventKey){ 
    switch(eventKey) {
      case 'profile': 
        console.log("logoclicked")
        appActions.profile();
        break;
      case 'addCode':
        console.log('addcodeclicked');
        appActions.addCode();
      default: break;
    }
  }
});
     



module.exports = Header;
// eventKey='profile' onClick={this._onUserDropDownClick.bind(this,'profile')} header={true} className='b-menu-item'>