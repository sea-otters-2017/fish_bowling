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
  }

  render() {
    return (
      <div>
        <Lobby gameState={this.state}/>
      </div>
    );
  }
}
