var React = require('react');

var StartGameForm = React.createClass({
  render: function () {
    var gameState = this.props.gameState;
    var gameStatusDisplay;

    var user_id = gameState.user_id;
    var isCreator = (user_id === gameState.creator.id);

    console.log('user_id', user_id);
    console.log('isCreator', isCreator);

    // if(isCreator && gameState.ready) {
    //   gameStatusDisplay = (
    //     <form id="start-game" className="action-form" action="/games/{gameState.game.name}/start" method="post">
    //       <input button className="btn waves-effect waves-light btn-large teal z-depth-" type="submit" value="Start Game!" />
    //     </form>
    //   );
    // } else if (!isCreator && gameState.ready) {
    //   gameStatusDisplay = (
    //     <span>
    //       Waiting for {gameState.creator.display_name} to push start...
    //     </span>
    //   );
    //
    // } else if(gameState.participants.length < 4) {
    //   var missingNo = 4 - gameState.participants.length;
    //   gameStatusDisplay = <span>Waiting for {missingNo} more player(s)...</span>;
    //
    // } else if (!gameState.has_cards) {
    //   gameStatusDisplay = <span>Waiting for all players to add 4 cards...</span>;
    // }
    return <div className='game-ready-status'>{gameStatusDisplay}</div>;
  }
});

module.exports = StartGameForm;
