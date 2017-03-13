import React, { PropTypes } from 'react';
var Lobby = require('./Lobby');
var TeamDisplay = require('./TeamDisplay');

export default class Game extends React.Component {

  static propTypes = {
    action: PropTypes.string.isRequired,
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
    console.log('this.state', this.state);
    console.log('this.state.game_started', this.state.game_started);
    return (
      <div>
        { !this.game_started &&
          <Lobby gameState={this.state}/> }
        { this.game_started && !gameState.round_started &&
          <TeamsDisplay gameState={this.state}/> }
      </div>
    );
  }
}
