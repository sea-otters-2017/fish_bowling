var React = require('react');
var GameTitle = require('./GameTitle');
var TeamDisplay = require('./TeamDisplay');
var StartGameForm = require('./StartGameForm');

var TeamsDisplay = React.createClass({
  render: function () {
    var gameState = this.props.gameState;
    return (
      <div>
        <GameTitle gameState={gameState} />
        <h4 className="banner">Teams:</h4>
        <div className='teams-container'>
          <TeamDisplay
            gameState={gameState}
            teamData={gameState.teams[0]}
            teamId={0} />
          <TeamDisplay
            gameState={gameState}
            teamData={gameState.teams[1]}
            teamId={1} />
        </div>
        <StartGameForm gameState={gameState}/>
      </div>
    );
  }
});

module.exports = TeamsDisplay;
