var React = require('react');
var GameTitle = require('./GameTitle');
var TeamDisplay = require('./TeamDisplay');

var TeamDisplay = React.createClass({
  render: function () {
    var gameState = this.props.gameState;
    return (
      <div>
        <GameTitle gameState={gameState} />
        <h4 class="banner">Teams:</h4>
        <div class='teams-container'>
          <TeamDisplay teamData={gameState.teams[0]} teamId={0} />
          <TeamDisplay teamData={gameState.teams[1]} teamId={0} />
        </div>

      </div>
    );
  }
});

module.exports = TeamDisplay;
