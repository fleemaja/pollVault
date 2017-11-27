import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlashMessage from './FlashMessage';
import { clearFlashMessages } from '../actions/flashMessages';

class FlashMessagesList extends Component {
  
  componentWillMount = () => {
    this.props.clearFlashMessages();
  }

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

function mapDispatchToProps(dispatch) {
  return {
    clearFlashMessages: () => dispatch(clearFlashMessages())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlashMessagesList);
