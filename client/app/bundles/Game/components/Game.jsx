import React, { PropTypes } from 'react';
var Lobby = require('./Lobby');
var Teams = require('./Teams');
var Gameplay = require('./Gameplay');

export default class Game extends React.Component {

  static propTypes = {
    action: PropTypes.string.isRequired
  };

  constructor(props, _railsContext) {
    super(props);
    this.action = props.action;
    this.state = props.gameState;
    var userdata = $("#live[data-userid]").data()
    var user_id = !!userdata ? userdata.userid : null;
    this.state.user_id = user_id;
  }

  render() {
    var gameState = this.state;
    return (
      <div>
        { !gameState.game_started &&
          <Lobby gameState={gameState}/> }
        { gameState.game_started && !gameState.round_started &&
          <Teams gameState={gameState}/> }
        { gameState.round_started &&
          <Gameplay gameState={gameState}/> }
      </div>
    );
  }
}
