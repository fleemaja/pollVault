import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';

class FlashMessage extends Component {
  state = {
    open: true
  }
  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };
  render() {
    const { id, type, text } = this.props.message;
    return (
      <Snackbar
          open={this.state.open}
          message={text}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
    )
  }
}

export default FlashMessage;
