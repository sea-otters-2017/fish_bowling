var React = require('react');
var JSTimer = require('../modules/JSTimer');


var Timer = React.createClass({
  render: function () {
    var secondsRemaining = this.props.secondsRemaining;
    var jsTimer = new JSTimer(secondsRemaining);
    return (
      <div id="timer" style={{display: 'block'}}>
        {jsTimer.startTimer()}
      </div>
    );
  }
});

module.exports = Timer;
