import React, { Component } from 'react';

class Reply extends Component {
  render() {
    const { reply } = this.props;
    return (
      <section>
        <strong>{ reply.author.username }</strong>
        <p>{ reply.text }</p>
      </section>
    )
  }
}

export default Reply;
