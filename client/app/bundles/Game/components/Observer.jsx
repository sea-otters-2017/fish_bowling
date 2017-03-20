var React = require('react');

var Observer = React.createClass({
  render: function () {
    var gameState = this.props.gameState;
    return (
      <div id='observer-container' className='card darken-1'>
        <h1>{gameState.cluegiver.display_name}'s turn</h1>
          <form className='game-form buzzer' action={'/games/' + gameState.game.name + '/buzz'} method='post'>
            <input className='myButton' type='submit' value='BUZZ' />
          </form>
      </div>
    );
  }
});

module.exports = Observer;
