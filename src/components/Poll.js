import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { apiVotePoll } from '../actions/polls';
import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import DeletePollConfirmation from './DeletePollConfirmation';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Results from './Results';
import Moment from 'moment';
import { letterToHexColor } from '../helpers';

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
    const author = poll.author;
    const pollOwnerId = author && author.id;
    const currentUser = this.props.auth.user.id;
    const isOwnedByUser = pollOwnerId === currentUser;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />
    ];
    const choiceId = this.state.choiceId;
    const time = Moment(`${poll.created}`).format("x");
    const timeAgo = Moment(time, "x").fromNow();
    const letter = author && author.username.charAt(0);
    return (
      <Paper style={style} zDepth={1} >
        {
          author && (
            author.photo ?
              <Avatar src={`../uploads/${author.photo}`} /> :
              <Avatar style={{backgroundColor: letterToHexColor[letter.toLowerCase()] || '#ddd', color: '#333'}}>{ letter }</Avatar>
          )
        }
        <strong style={{margin: '0 10px'}}>{ author && author.username }</strong>
        <span>{ timeAgo }</span>
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
