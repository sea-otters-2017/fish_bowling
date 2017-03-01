import React, { PropTypes } from 'react';
var Lobby = require('./Lobby');
var GameTitle = require('./GameTitle');

export default class Game extends React.Component {

  static propTypes = {
    action: PropTypes.string.isRequired,
  };

  constructor(props, _railsContext) {
    super(props);
    console.log('props.gameState', props.gameState);
    this.action = props.action;
    this.state = props.gameState;
  }

  render() {
    return (
      <div>
        <h3 className="game-name">{this.state.game.name}</h3>
        <div id="round-container">
          <p>Current Round: test</p>
        </div>
        <GameTitle />
        <Lobby />
      </div>
    );
  }
}
