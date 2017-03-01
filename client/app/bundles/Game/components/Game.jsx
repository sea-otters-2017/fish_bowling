import React, { PropTypes } from 'react';
var Lobby = require('./Lobby');

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
    console.log('this.state', this.state);
  }

  render() {
    return (
      <div>
        {this.state.user_id}
        <Lobby gameState={this.state}/>
      </div>
    );
  }
}
