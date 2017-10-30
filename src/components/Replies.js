import React, { Component } from 'react';
import Reply from './Reply';

class Replies extends Component {

  render() {
    const { replies, commentId } = this.props;
    return (
      <section style={{marginLeft: 50}}>
        <section>
          <h3>
            { replies.length } Replies
          </h3>
          {
            replies.map(r =>
              <Reply reply={r} commentId={commentId} />
            )
          }
        </section>
      </section>
    )
  }
}

export default Replies;
