var React = require('react');

var Timer = React.createClass({
  render: function () {
    var secondsRemaining = this.props.secondsRemaining;
    return (
      <div id="timer" style={{display: 'block'}}>
        {secondsRemaining}
      </div>
    );
  }
});

module.exports = Timer;
