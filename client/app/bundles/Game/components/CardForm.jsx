var React = require('react');

var CardForm = React.createClass({
  render: function () {
    var gameState = this.props.gameState;
    var thisPlayer = gameState.participants.find(function(player) {
      return player.id === gameState.user_id
    });
    console.log('gameState', gameState)
    console.log('thisPlayer',thisPlayer)
    if (thisPlayer.cards_count >= 4) return null;
    return (
      <div id="create-card-form">
        <form id="new_card" className="action-form" action="/cards" acceptCharset="UTF-8" method="post">
          <input type="text" placeholder="Enter card" name="card[concept]" id="card_concept" />
          <input type="hidden" name="game_id" id="game_id" value={gameState.game.id} />
          <div className="actions-container">
            <button className="btn waves-effect cyan accent-1, z-depth-4" type="submit" name="action">ADD CARD
            </button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = CardForm;
