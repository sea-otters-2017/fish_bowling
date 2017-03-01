var React = require('react');

var Lobby = React.createClass({
  render: function () {
    var titleText = 'Favorite ' + this.props.name;
    return (
      <div>
        <h1>titleText</h1>
        <ul>this.props.children</ul>
      </div>
    );
  }
});

module.exports = Lobby;
