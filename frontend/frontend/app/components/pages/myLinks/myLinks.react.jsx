'use strict';

/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');


var MyLinks = React.createClass({

  render: function() {


  	console.log("-----> " +this.props.user);
  	console.dir(this.props.user.myLinks);
    var links = this.props.user.myLinks.map(function(data){
      return (
        <div>
        <p>{data.promoLink}</p>
        <img src={data.linkThumbnail} />
        </div>

        );
 	});

 console.dir(links);


    return (
      <div className='container'>
      <p>here are all of my links</p>
      <br/>
      {links}
      </div>
    );
  }
});

module.exports = MyLinks;
