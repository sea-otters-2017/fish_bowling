var React = require('react');
var GameTitle = require('./GameTitle');

var TeamDisplay = React.createClass({
  render: function () {
    var gameState = this.props.gameState;
    return (
      <div>
        <div class="team-1">
          <h5 id="team-name">${team1.name}</h5>
          <ul>
            <div class="team-players">${team1Players}</div>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = TeamDisplay;
