var React = require('react');

var Participants = React.createClass({
  render: function () {
    var gameState = this.props.gameState;
    var allPlayers = '';

    const participants = gameState.participants.map((participant, index) =>
      <li
        className='player-name' 
        key={'participant-' + index}>{participant.display_name}</li>
    );

    return (
      <div className='participants-container'>
        <h4 className="participants">Participants</h4>
        <ul className='player-names-list'>{participants}</ul>
      </div>
    );
  }
});

module.exports = Participants;
