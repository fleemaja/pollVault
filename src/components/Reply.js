import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { apiVoteReply } from '../actions/comments';
import Dialog from 'material-ui/Dialog';
import Like from 'material-ui/svg-icons/action/thumb-up';
import Dislike from 'material-ui/svg-icons/action/thumb-down';
import Moment from 'moment';
import AddReplyForm from './AddReplyForm';
import DeleteReplyConfirmation from './DeleteReplyConfirmation';
import { letterToHexColor } from '../helpers';

class Reply extends Component {
  state = {
    deleteReplyModalOpen: false,
    displayReplyForm: false
  }

  handleOpen = () => {
    this.setState({ deleteReplyModalOpen: true });
  };

  handleClose = () => {
    this.setState({ deleteReplyModalOpen: false });
  };

  vote = (isUpvote) => {
    const reply = this.props.reply;
    const replyId = reply.id;
    this.props.vote(replyId, isUpvote);
  }

  displayReplyForm = () => {
    this.setState({ displayReplyForm: true })
  }

  hideReplyForm = () => {
    this.setState({ displayReplyForm: false })
  }

  render() {
    const { reply, auth } = this.props;
    const { displayReplyForm } = this.state;
    const author = reply.author;
    const replyOwnerId = author && author.id;
    const votes = reply.votes;
    const currentUser = auth.user.id;
    const isOwnedByUser = replyOwnerId === currentUser;
    const voteScore = (votes.length > 0) ? votes.reduce((accumulator, currentVote) => {
      const voteVal = currentVote.isUpvote ? 1 : -1;
      return accumulator + voteVal;
    }, 0) : 0;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />
    ];
    let userVoted = false;
    let userVoteIsUpvote;
    if (auth.isAuthenticated) {
      const voteFilter = reply.votes.filter(v => v.author === auth.user.id);
      if (voteFilter.length > 0) {
        userVoted = true;
        userVoteIsUpvote = voteFilter[0].isUpvote;
      }
    }
    const time = Moment(`${reply.created}`).format("x");
    const timeAgo = Moment(time, "x").fromNow();
    const letter = author.username.charAt(0);
    return (
      <section>
        {
          author && (
            author.photo ?
              <Avatar size={30} src={`../uploads/${author.photo}`} /> :
              <Avatar size={30} style={{backgroundColor: letterToHexColor[letter.toLowerCase()] || '#ddd', color: '#333'}}>{ letter }</Avatar>
          )
        }
        <strong style={{margin: '0 10px'}} >{ author.username }</strong>
        <span>{ timeAgo }</span>
        <p>{ reply.text }</p>
        <strong>{ voteScore }</strong>
        <FlatButton
          title='Upvote'
          icon={<Like />}
          style={{ opacity: userVoteIsUpvote ? 1 : 0.5 }}
          onClick={() => this.vote(true)}
         />
         <FlatButton
           title='Downvote'
           icon={<Dislike />}
           style={{ opacity: (userVoted && !userVoteIsUpvote) ? 1 : 0.5 }}
           onClick={() => this.vote(false)}
          />
        <FlatButton
          title="Reply"
          label="Reply"
          onClick={this.displayReplyForm.bind(this)}
         />
        {
          displayReplyForm &&
          <AddReplyForm
            commentId={this.props.commentId}
            hideReplyForm={this.hideReplyForm.bind(this)} />
        }
        {
          isOwnedByUser &&
          <section>
            <RaisedButton
              label='Delete'
              onClick={this.handleOpen}
             />
            <Dialog
              title="Delete Reply?"
              actions={actions}
              modal={true}
              open={this.state.deleteReplyModalOpen}
            >
              <DeleteReplyConfirmation
                reply={reply}
                commentId={this.props.commentId}
                handleClose={this.handleClose.bind(this)} />
            </Dialog>
          </section>
        }
      </section>
    )
  }
}

function mapStateToProps ({ auth }) {
  return { auth }
}

function mapDispatchToProps(dispatch) {
  return {
    vote: (id, isUpvote) => dispatch(apiVoteReply(id, isUpvote))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reply);
