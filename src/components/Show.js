import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { fetchPoll } from '../actions/polls';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Show extends Component {
  state = {
    title: ''
  }
  componentWillMount() {
    const pollId = this.props.match.params.pollId;
    const poll = fetchPoll(pollId)
    if (poll) {
      this.setState({ title: poll.title })
    }
  }
  render() {
    const { title } = this.state
    return (
      <MuiThemeProvider>
        <Paper style={style} zDepth={1} >
          <h2>{ title }</h2>
        </Paper>
        <p>Comments Go Here</p>
      </MuiThemeProvider>
    )
  }
}

const style = {
  width: 600,
  margin: 20,
  padding: 20,
  textAlign: 'center',
  display: 'inline-block'
};

export default Show;
