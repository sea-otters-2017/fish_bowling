var React = require('react');

var Clue = React.createClass({
  render: function () {
    var gameState = this.props.gameState;
    return (
      <div id='cluegiver-container' className='card darken-1'>
        <h1 id='card-concept'>{gameState.card}</h1>
        <div className='actions'>
          <form className='game-form' action={'/games/' + gameState.game.name + '/pass'} method='post'>
            <input className='waves-effect waves-light btn-large red' type='submit' value='pass' />
          </form>
          <form className='game-form' action={'/games/' + gameState.game.name + '/win_card'} method='post'>
            <input className='waves-effect waves-light btn-large teal' type='submit' value='got it!' />
          </form>
          <form className='game-form' action={'/games/' + gameState.game.name + '/pause'} method='post'>
            <input className='waves-effect waves-light btn-large orange' type='submit' value='pause' />
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Clue;
