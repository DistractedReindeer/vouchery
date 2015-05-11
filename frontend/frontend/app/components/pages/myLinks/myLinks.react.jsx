'use strict';

/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');


var MyLinks = React.createClass({

  render: function() {
    /*

       <div>
        <p>{data.promoLink}</p>
        <img src={data.linkThumbnail} />
        </div>
    */


  	console.log("-----> " +this.props.user);
  	console.dir(this.props.user.myLinks);
    var links = this.props.user.myLinks.map(function(data){
      return (

        <div className="col-xs-12 col-sm-4">
            <div className="panel panel-default panel-google-plus">
                <div className="panel-heading">
                    <img className="img-circle pull-left fbImage" src={data.fbPicture}  />
                    <h3>Robert McIntosh</h3>
                    <h5><span>Shared publicly</span> - <span>Jun 25, 2014</span> </h5>
                </div>
                <div className="panel-body">
                    <p>Just created a new snippet inspired by the Svbtle Menu. Find it here: <a href="http://bootsnipp.com/snippets/MaWrA">http://bootsnipp.com/snippets/MaWrA</a></p>
                    <a className="panel-google-plus-image" href="https://plus.google.com/photos/115077481218689845626/albums/6028961040749409985/6028961040650432498">
                        <img src={data.linkThumbnail} />
                    </a>
                </div>     
            </div>
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
