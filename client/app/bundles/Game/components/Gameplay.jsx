var React = require('react');
var GameTitle = require('./GameTitle');
var Clue = require('./Clue');
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
        <GameTitle gameState={gameState}/>
        {isCluegiver && <Clue gameState={gameState} />}
        {!isCluegiver && <Clue gameState={gameState} />}
        {isCreator && <NextTurn gameName={gameState.game.name} />}
      </div>
    );
  }
});

module.exports = Gameplay;
