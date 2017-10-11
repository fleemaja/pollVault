import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlashMessage from './FlashMessage';

class FlashMessagesList extends Component {
  render() {
    const messages = this.props.flashMessages.map(m =>
      <FlashMessage key={m.id} message={m} />
    );
    return (
      <section>{ messages }</section>
    )
  }
}

function mapStateToProps ({ flashMessages}) {
  return { flashMessages }
}

export default connect(mapStateToProps)(FlashMessagesList);
