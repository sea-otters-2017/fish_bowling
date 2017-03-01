var React = require('react');

var GameTitle = React.createClass({
  render: function () {
    var titleText = 'Favorite ' + "this.props.name";
    return (
      <div>
        <h3 className="game-name">NAMEHERE</h3>
        <div id="round-container">
          <p>Current Round: ROUNDHERE</p>
        </div>
      </div>
    );
  }
});

module.exports = GameTitle;
