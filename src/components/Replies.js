import React, { Component } from 'react';
import Reply from './Reply';

class Replies extends Component {

  render() {
    const { replies } = this.props;
    return (
      <section>
        <section>
          <h3 style={{margin: 20, display: 'inline-block', verticalAlign: 'middle', color: '#333'}}>
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
