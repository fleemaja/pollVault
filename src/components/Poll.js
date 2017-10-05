import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { apiPollDelete } from '../actions/polls';

class Poll extends Component {

  deletePoll = () => {
    const poll = this.props.poll;
    const pollId = poll.id;
    this.props.deletePoll(pollId);
  }

  render() {
    const poll = this.props.poll
    return (
      <Paper style={style} zDepth={1} >
        <Link to={`/polls/${poll.id}`}>
          <h2>{ poll.title }</h2>
        </Link>
        <RaisedButton
          label='Delete'
          onClick={this.deletePoll.bind(this)}
        />
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

function mapDispatchToProps(dispatch) {
  return {
    deletePoll: (id) => dispatch(apiPollDelete(id))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Poll);
