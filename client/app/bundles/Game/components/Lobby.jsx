var React = require('react');
var GameTitle = require('./GameTitle');
var Participants = require('./Participants');
var CardForm = require('./CardForm');
var StartGameForm = require('./StartGameForm');

var Lobby = React.createClass({
  render: function () {
    var gameState = this.props.gameState;
    return (
      <div>
        <GameTitle gameState={gameState}/>
        <Participants gameState={gameState}/>
        <CardForm gameState={gameState}/>
        <StartGameForm gameState={gameState}/>
      </div>
    );
  }
});

module.exports = Lobby;
