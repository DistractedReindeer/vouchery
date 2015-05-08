'use strict';

/* @jsx react.DOM */

var React         = require('react');
var Router        = require('react-router'),
    DefaultRoute  = Router.DefaultRoute,
    Route         = Router.Route,
    Redirect      = Router.Redirect,
    NotFoundRoute = Router.NotFoundRoute;

var Master      = require('../components/master.react.jsx');
var SignUp      = require('../components/pages/signup/signup.react.jsx');
var ProfilePage = require('../components/pages/profile/profilePage.react.jsx');
var addCode = require('../components/pages/addCode/addCodePage.react.jsx');

var AppRoutes = (
  <Route name='root' path='/' handler={Master}>
    <DefaultRoute handler={SignUp}/>
    <Route name='register' handler={SignUp}/>
    <Route name='addCode' path='addCode' handler={addCode}/>
    <Route name='profile' path='profile' handler={ProfilePage}/>
    <NotFoundRoute handler={SignUp}/>
  </Route>
);

module.exports = AppRoutes;