import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { apiVotePoll } from '../actions/polls';
import Dialog from 'material-ui/Dialog';
import DeletePollConfirmation from './DeletePollConfirmation';
import Option from './Option';

class Poll extends Component {

  state = {
    deletePollModalOpen: false
  }

  handleOpen = () => {
    this.setState({deletePollModalOpen: true});
  };

  handleClose = () => {
    this.setState({deletePollModalOpen: false});
  };

  vote = (option) => {
    const poll = this.props.poll;
    const pollId = poll.id;
    this.props.vote(pollId, option);
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
    return (
      <Paper style={style} zDepth={1} >
        <Link to={`/polls/${poll.slug}`}>
          <h2>{ poll.title }</h2>
        </Link>
        {
          poll.choices && poll.choices.map(o =>
            <Option
              vote={() => this.vote(o.text)}
              option={o}
            />
          )
        }
        {
          isOwnedByUser &&
          <section>
            <RaisedButton
              label='Delete'
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
  margin: '20px 10px',
  padding: 20,
  textAlign: 'center',
  display: 'inline-block'
};

function mapStateToProps ({ auth }) {
  return { auth }
}

function mapDispatchToProps(dispatch) {
  return {
    vote: (id, option) => dispatch(apiVotePoll(id, option))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Poll);
