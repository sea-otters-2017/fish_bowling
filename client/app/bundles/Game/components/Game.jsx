import React, { PropTypes } from 'react';

export default class Game extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  constructor(props, _railsContext) {
    super(props);
    console.log('props', props);
    console.log('_railsContext', _railsContext);
    // this.state = { name: this.props.name };
  }

  render() {
    return (
      <div>
        <p>nothing at the moment</p>
      </div>
    );
  }
}
