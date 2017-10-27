import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { apiVotePoll } from '../actions/polls';
import Dialog from 'material-ui/Dialog';
import DeletePollConfirmation from './DeletePollConfirmation';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Results from './Results';

class Poll extends Component {

  state = {
    choiceId: '',
    deletePollModalOpen: false
  }

  handleOpen = () => {
    this.setState({deletePollModalOpen: true});
  };

  handleClose = () => {
    this.setState({deletePollModalOpen: false});
  };

  handleChoiceChange = (e) => {
    this.setState({ choiceId: e.target.value })
  }

  makeVote = (choiceId) => {
    const poll = this.props.poll;
    const pollId = poll.id;
    this.props.vote(pollId, choiceId);
  }

  render() {
    const poll = this.props.poll;
    const pollOwner = poll.author && poll.author.id;
    const currentUser = this.props.auth.user.id;
    const isOwnedByUser = pollOwner === currentUser;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />
    ];
    const choiceId = this.state.choiceId
    return (
      <Paper style={style} zDepth={1} >
        <Link to={`/polls/${poll.slug}`}>
          <h2>{ poll.title }</h2>
        </Link>
        {
          poll.hasVoted ? <Results ipVote={poll.ipVote} choices={poll.choices} /> :
          <section>
            <RadioButtonGroup
              name="choice"
              id="choice"
              onChange={this.handleChoiceChange.bind(this)}>
              {
                poll.choices && poll.choices.map(o =>
                  <RadioButton
                    value={o.id}
                    label={`${ o.text } - ${ o.votes }`}
                  />
                )
              }
            </RadioButtonGroup>
            <RaisedButton
              label="Vote"
              disabled={choiceId === ''}
              onClick={() => this.makeVote(choiceId)} />
          </section>
        }
        {
          isOwnedByUser &&
          <section>
            <RaisedButton
              label='Delete'
              secondary={true}
              onClick={this.handleOpen}
             />
            <Dialog
              title="Delete Poll?"
              actions={actions}
              modal={true}
              open={this.state.deletePollModalOpen}
            >
              <DeletePollConfirmation
                poll={poll}
                handleClose={this.handleClose.bind(this)} />
            </Dialog>
          </section>
        }
      </Paper>
    )
  }
}

const style = {
  width: 300,
  marginBottom: 40,
  padding: 20
};

function mapStateToProps ({ auth }) {
  return { auth }
}

function mapDispatchToProps(dispatch) {
  return {
    vote: (pollId, choiceId) => dispatch(apiVotePoll(pollId, choiceId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Poll);
