import React, { Component } from 'react';

class Comment extends Component {
  render() {
    const comment = this.props.comment
    return (
      <section>
        <strong>{ comment.author }</strong>
        <p>{ comment.body }</p>
      </section>
    )
  }
}

export default Comment;
