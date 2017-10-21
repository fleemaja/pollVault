import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { apiVoteComment } from '../actions/comments';
import Dialog from 'material-ui/Dialog';
import DeleteCommentConfirmation from './DeleteCommentConfirmation';
import Like from 'material-ui/svg-icons/action/thumb-up';
import Dislike from 'material-ui/svg-icons/action/thumb-down';
import Avatar from 'material-ui/Avatar';

class Comment extends Component {

  state = {
    deleteCommentModalOpen: false
  }

  handleOpen = () => {
    this.setState({deleteCommentModalOpen: true});
  };

  handleClose = () => {
    this.setState({deleteCommentModalOpen: false});
  };

  vote = (isUpvote) => {
    const comment = this.props.comment;
    const commentId = comment.id;
    this.props.vote(commentId, isUpvote);
  }

  render() {
    const comment = this.props.comment;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />
    ];
    const voteScore = comment.votes.reduce((accumulator, currentVote) => {
      const voteVal = currentVote.isUpvote ? 1 : -1;
      return accumulator + voteVal;
    }, 0);
    return (
      <section style={{textAlign: 'left', marginBottom: 20}}>
        <Avatar style={{marginRight: 10}}>{ comment.author.username.substring(0, 3) }</Avatar>
        <strong>{ comment.author.username }</strong>
        <span style={{marginLeft: 10}}>4 hours ago</span>
        <p>{ comment.text }</p>
        <strong>{ voteScore }</strong>
        <FlatButton
          title='Upvote'
          icon={<Like />}
          onClick={() => this.vote(true)}
         />
         <FlatButton
           title='Downvote'
           icon={<Dislike />}
           onClick={() => this.vote(false)}
          />
        <RaisedButton
          label='Delete'
          onClick={this.handleOpen}
         />
        <Dialog
          title="Delete Comment?"
          actions={actions}
          modal={true}
          open={this.state.deleteCommentModalOpen}
        >
          <DeleteCommentConfirmation
            comment={comment}
            handleClose={this.handleClose.bind(this)} />
        </Dialog>
      </section>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    vote: (id, isUpvote) => dispatch(apiVoteComment(id, isUpvote))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Comment);
