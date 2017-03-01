var React = require('react');
var GameTitle = require('./GameTitle');
var CardForm = require('./CardForm');

var Lobby = React.createClass({
  render: function () {
    var gameState = this.props.gameState;
    return (
      <div>
        <h1>titleText</h1>
        <ul>this.props.children</ul>
        <GameTitle gameState={gameState}/>
        <CardForm gameState={gameState}/>
      </div>
    );
  }
});

module.exports = Lobby;
