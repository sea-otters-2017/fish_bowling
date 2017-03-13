var React = require('react');
var GameTitle = require('./GameTitle');

var TeamDisplay = React.createClass({
  render: function () {
    var gameState = this.props.gameState;
    return (
      <div>
        <GameTitle gameState={gameState}/>
      </div>
    );
  }
});

module.exports = TeamDisplay;
