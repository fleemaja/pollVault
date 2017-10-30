import React, { Component } from 'react';
import Reply from './Reply';

class Replies extends Component {

  render() {
    const { replies } = this.props;
    return (
      <section style={{marginLeft: 40}}>
        <section>
          <h3>
            { replies.length } Replies
          </h3>
          {
            replies.map(r => <Reply reply={r} />)
          }
        </section>
      </section>
    )
  }
}

export default Replies;
