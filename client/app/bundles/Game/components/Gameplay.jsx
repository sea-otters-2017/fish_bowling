var React = require('react');
var GameTitle = require('./GameTitle');

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
        {isCluegiver && <div>I AM THE CLUEGIVER!</div>}
        {!isCluegiver && <div>I AIN'T THE CLUEGIVER!</div>}
        {isCreator && <div>I AM THE CREATOR!</div>}
      </div>
    );
  }
});

module.exports = Gameplay;
