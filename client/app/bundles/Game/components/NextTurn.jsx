var React = require('react');

var NextTurn = React.createClass({
  render: function () {
    return (
      <div className='next-container'>
        <form className='game-form' action={'/games/' + this.props.gameName + '/next_turn'} method='post'>
          <input className='waves-effect waves-light btn-large green' type='submit' value='NEXT TURN' />
        </form>
      </div>
    );
  }
});

module.exports = NextTurn;
