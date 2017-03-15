var React = require('react');
var GameTitle = require('./GameTitle');
var Team = require('./Team');
var StartGameForm = require('./StartGameForm');

var Teams = React.createClass({
  render: function () {
    var gameState = this.props.gameState;
    return (
      <div>
        <GameTitle gameState={gameState} />
        <h4 className="banner">Teams:</h4>
        <div className='teams-container'>
          <Team
            gameState={gameState}
            teamData={gameState.teams[0]}
            teamId={0} />
          <Team
            gameState={gameState}
            teamData={gameState.teams[1]}
            teamId={1} />
        </div>
        <StartGameForm gameState={gameState}/>
      </div>
    );
  }
});

module.exports = Teams;
