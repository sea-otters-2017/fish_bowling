import React, { PropTypes } from 'react';

export default class HelloWorld extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  constructor(props, _railsContext) {
    super(props);

    this.state = { name: this.props.name };
  }

  render() {
    return (
      <div>
        <h3 class="game-name">{this.state.game.name}</h3>
        <div id='round-container'>
          <p>Current Round: {this.state.current_round.type}</p>
        </div>
        <h3>
          Hello, {this.state.name}!
        </h3>
      </div>
    );
  }
}
