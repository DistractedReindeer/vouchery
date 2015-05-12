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

      var parsedLink = '';
      var parser = document.createElement('a');
      parser.href = data.promoLink; 
      parsedLink = parser.hostname.substring(parser.hostname.indexOf(".")+1, parser.hostname.lastIndexOf('.')).toUpperCase();
      return (

        <div className="col-xs-12 col-sm-4">
            <div className="panel panel-default panel-google-plus">
                <div className="panel-heading">
                    <img className="img-circle pull-left fbImage" src={data.fbPicture}  />
                    <h3>{data.userName}</h3>
                    <h5><span>Shared publicly</span> - <span>{data.updatedAt}</span> </h5>
                </div>
                <div className="panel-body">
                    <p className="linkTitles"> {parsedLink} </p>
                    <a className="panel-google-plus-image" href={data.promoLink}>
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
      <br/>
      {links}
      </div>
    );
  }
});

module.exports = MyLinks;
