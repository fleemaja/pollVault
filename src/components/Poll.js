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
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Cancel from 'material-ui/svg-icons/navigation/cancel';

class Poll extends Component {

  state = {
    choiceId: '',
    deleteMenuOpen: false,
    anchorEl: null,
    deletePollModalOpen: false
  }

  handleDeleteModalOpen = () => {
    this.handleDeleteMenuClose();
    this.setState({deletePollModalOpen: true});
  };

  handleDeleteModalClose = () => {
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

  handleDeleteMenuOpen = (e) => {
    this.setState({
      deleteMenuOpen: true,
      anchorEl: e.currentTarget,
    });
  };

  handleDeleteMenuClose = () =>
    this.setState({deleteMenuOpen: false});

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
        onClick={this.handleDeleteModalClose}
      />
    ];
    const choiceId = this.state.choiceId;
    const time = Moment(`${poll.created}`).format("x");
    const timeAgo = Moment(time, "x").fromNow();
    const letter = author && author.username.charAt(0);
    const numVotes = poll.votes.length;
    return (
      <Paper style={style} zDepth={1} >
        <section>
          <section style={{display: 'inline-block', verticalAlign: 'middle'}} >
            {
              author && (
                author.photo ?
                  <Avatar src={`../uploads/${author.photo}`} /> :
                  <Avatar style={{backgroundColor: letterToHexColor[letter.toLowerCase()] || '#ddd', color: '#333'}}>{ letter }</Avatar>
              )
            }
          </section>
          <section style={{display: 'inline-block', verticalAlign: 'middle'}} >
            <strong style={{margin: '0 10px'}}>{ author && author.username }</strong>
            <span>{ timeAgo }</span>
          </section>
        </section>
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
                    label={o.text}
                  />
                )
              }
            </RadioButtonGroup>
            <RaisedButton
              label="Vote"
              disabled={choiceId === ''}
              style={{marginTop: 20}}
              onClick={() => this.makeVote(choiceId)} />
          </section>
        }
        <section style={{color: 'rgba(0, 0, 0, 0.64)', fontSize: 12, marginTop: 20}}>
          <span>
            { `${numVotes} ${numVotes === 1 ? 'vote' : 'votes'}` }
          </span>
          <span style={{margin: '0 10px'}}>
            { '-' }
          </span>
          <span>
            { poll.category }
          </span>
          {
            isOwnedByUser &&
            <section style={{display: 'inline-block', verticalAlign: 'middle'}}>
              <IconButton
                tooltip="Delete Poll?"
                onClick={this.handleDeleteMenuOpen}>
                <Cancel />
              </IconButton>
              <Popover
                open={this.state.deleteMenuOpen}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleDeleteMenuClose}
              >
                <Menu>
                  <MenuItem
                    onClick={this.handleDeleteModalOpen}
                    primaryText="Delete Poll?" />
                </Menu>
              </Popover>
              <Dialog
                title="Delete Poll?"
                actions={actions}
                modal={true}
                open={this.state.deletePollModalOpen}
              >
                <DeletePollConfirmation
                  poll={poll}
                  handleClose={this.handleDeleteModalClose.bind(this)} />
              </Dialog>
            </section>
          }
        </section>
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
