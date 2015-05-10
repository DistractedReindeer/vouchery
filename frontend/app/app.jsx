'use strict';

(function() {
  
  var React     = require('react');
  var Router    = require('react-router');
  var AppRoutes = require('./helpers/routes.jsx');

  window.react = React;


  Router.create({
    routes: AppRoutes,
    scrollBehaviour: Router.ScrollToTopBehavior
  })
  .run(function(Handler) {
    React.render(<Handler/>, document.getElementById('app'));
  });

})();