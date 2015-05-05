'use strict';

/** @jsx React.DOM */

var React  = require('react');

var Router = require('react-router'),
    Link   = Router.Link;

var Navbar = require('react-bootstrap').Navbar,
    Nav = require('react-bootstrap').Nav,
    NavItem = require('react-bootstrap').Navbar;

var UserName = require('./userName.react.jsx');

var Header = React.createClass({
  render: function() {
   
    var userBlock,
        brand = <div className='mainLogo'>
                  <img src='images/logo.png' className='mainLogo' />
                </div>;

    if(this.props.userState == 'pending' || !this.props.userState) {
      userBlock = null;      
    } else if(this.props.userState) {
      userBlock = <div className='userBlock'>
                    <UserName user={this.props.user}/>
                  </div>
    }

    return (
      <Navbar className='' brand={brand}>
        {userBlock}
      </Navbar>
    );
  }
});
      
module.exports = Header;
