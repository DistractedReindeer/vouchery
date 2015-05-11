'use strict';

/** @jsx React.DOM */

var React = require('react');


var SearchBox = React.createClass({

    propTypes: {
      onSearch: React.PropTypes.func.isRequired
    },

    // grab the query value and put it into state
    // as the value may mutate as the user types
    getInitialState: function() {
      return {
        query: this.props.query || ''
      };
    },

    // if a change is ever propogated through properties
    componentWillReceiveProps: function(nextProps) {
      this.setState({ query: nextProps.query || '' });
    },

    doSearch:function(event){
        // grab the new value from the input text box
        var newQuery = event.target.value || '';
        this.setState({ query: newQuery });

        this.props.onSearch.call(this, newQuery);
    },
    render:function(){
        return (<input type="text"
            placeholder="Search Name"
            value={ this.state.query }
            onChange={ this.doSearch }/>);
    }
});

var App = React.createClass({
  _onSearch: function(query) {
    console.log(query);
  },
  render: function() {
    return (
      <div>
        <SearchBox onSearch={ this._onSearch } />
      </div>);

  }
});

React.render(<App />, document.body);
