import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';

class Poll extends Component {
  render() {
    const poll = this.props.poll
    return (
      <Paper style={style} zDepth={1} >
        <Link to={`/polls/${poll.id}`}>
          <h2>{ poll.title }</h2>
        </Link>
      </Paper>
    )
  }
}

const style = {
  width: 300,
  margin: '20px 10px',
  padding: 20,
  textAlign: 'center',
  display: 'inline-block'
};

export default Poll;
