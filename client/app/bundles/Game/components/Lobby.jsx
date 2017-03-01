var React = require('react');
var GameTitle = require('./GameTitle');
var CardForm = require('./CardForm');
var Participants = require('./Participants');

var Lobby = React.createClass({
  render: function () {
    var gameState = this.props.gameState;
    return (
      <div>
        <GameTitle gameState={gameState}/>
        <CardForm gameState={gameState}/>
        <Participants gameState={gameState}/>
      </div>
    );
  }
});

module.exports = Lobby;
