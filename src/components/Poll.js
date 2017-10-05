import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { apiPollDelete, apiVotePoll } from '../actions/polls';
import Dialog from 'material-ui/Dialog';
import EditPollForm from './EditPollForm';

class Poll extends Component {

  state = {
    editPollModalOpen: false
  }

  handleOpen = () => {
    this.setState({editPollModalOpen: true});
  };

  handleClose = () => {
    this.setState({editPollModalOpen: false});
  };

  deletePoll = () => {
    const poll = this.props.poll;
    const pollId = poll.id;
    this.props.deletePoll(pollId);
  }

  vote = () => {
    const poll = this.props.poll;
    const pollId = poll.id;
    this.props.vote(pollId);
  }

  render() {
    const poll = this.props.poll
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />
    ];
    return (
      <Paper style={style} zDepth={1} >
        <strong>{ poll.votes } votes</strong>
        <Link to={`/polls/${poll.id}`}>
          <h2>{ poll.title }</h2>
        </Link>
        <RaisedButton
          primary={true}
          label='Vote'
          onClick={this.vote}
         />
        <RaisedButton
          label='Edit'
          onClick={this.handleOpen}
         />
        <Dialog
          title="Edit Poll"
          actions={actions}
          modal={true}
          open={this.state.editPollModalOpen}
        >
          <EditPollForm
            poll={poll}
            handleClose={this.handleClose.bind(this)} />
        </Dialog>
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
    deletePoll: (id) => dispatch(apiPollDelete(id)),
    vote: (id) => dispatch(apiVotePoll(id))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Poll);
