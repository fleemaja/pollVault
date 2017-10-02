import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

class Poll extends Component {
  render() {
    return (
      <Paper style={style}>
        <h2>{ this.props.title }</h2>
      </Paper>
    )
  }
}

const style = {
  width: 300,
  margin: 20,
  padding: 20,
  textAlign: 'center',
  display: 'inline-block'
};

export default Poll;
