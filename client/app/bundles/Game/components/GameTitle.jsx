var React = require('react');

var GameTitle = React.createClass({
  render: function () {
    var gameState = this.props.gameState;
    return (
      <div>
        <h3 className="game-name">{gameState.game.name}</h3>
        { gameState.game_started &&
          <div id="round-container">
            <p>Current Round: {gameState.current_round.type}</p>
          </div> }
      </div>
    );
  }
});

module.exports = GameTitle;
