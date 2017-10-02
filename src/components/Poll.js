import React, { Component } from 'react';

class Poll extends Component {
  render() {
    return (
      <section>
        { this.props.title }
      </section>
    )
  }
}

export default Poll;
