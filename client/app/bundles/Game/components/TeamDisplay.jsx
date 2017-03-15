var React = require('react');

var TeamDisplay = React.createClass({
  render: function () {
    var teamData = this.props.teamData;

    const players = teamData.players.map((player, index) =>
      <li
        className='player-name'
        key={'player-' + index}>{player.display_name}</li>
    );

    return (
      <div>
        <div className="team-1">
          <h5 id="team-name">{teamData.name}</h5>
          <ul>
            <div className="team-players">{players}</div>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = TeamDisplay;
