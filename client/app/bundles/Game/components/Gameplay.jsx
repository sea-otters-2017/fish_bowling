var React = require('react');
var Timer = require('./Timer');
var GameTitle = require('./GameTitle');
var Clue = require('./Clue');
var Observer = require('./Observer');
var NextTurn = require('./NextTurn');

var Gameplay = React.createClass({

  render: function () {
    var gameState = this.props.gameState;
    var user_id = gameState.user_id;
    var isCluegiver = (user_id === gameState.cluegiver.id);
    var cluegiver = gameState.cluegiver.display_name;
    var isCreator = (user_id === gameState.creator.id);

    return (
      <div>
        <Timer secondsRemaining={gameState.last_turn.seconds_remaining} />
        <GameTitle gameState={gameState}/>
        {isCluegiver && <Clue gameState={gameState} />}
        {!isCluegiver && <Observer gameState={gameState} />}
        {isCreator && <NextTurn gameName={gameState.game.name} />}
      </div>
    );
  }
});

module.exports = Gameplay;
