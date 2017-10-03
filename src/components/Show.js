import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { fetchPoll } from '../actions/polls';
import { getCommentsByPoll } from '../actions/comments';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import Comments from './Comments';

class Show extends Component {
  state = {
    title: ''
  }
  componentWillMount() {
    const pollId = this.props.match.params.pollId;
    const poll = fetchPoll(pollId)
    this.props.getCommentsByPoll(pollId);
    if (poll) {
      this.setState({ title: poll.title })
    }
  }
  render() {
    const { title } = this.state
    const comments = this.props.comments
    return (
      <MuiThemeProvider>
        <section>
          <Paper style={style} zDepth={1} >
            <h2>{ title }</h2>
          </Paper>
          <Comments comments={comments} />
        </section>
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

function mapStateToProps ({ comments }) {
  return { comments }
}

function mapDispatchToProps(dispatch) {
  return {
    getCommentsByPoll: (id) => dispatch(getCommentsByPoll(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Show);
