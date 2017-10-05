import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { apiCommentDelete, apiVoteComment } from '../actions/comments';
import Dialog from 'material-ui/Dialog';
import EditCommentForm from './EditCommentForm';
import UpArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down';

class Comment extends Component {

  state = {
    editCommentModalOpen: false
  }

  handleOpen = () => {
    this.setState({editCommentModalOpen: true});
  };

  handleClose = () => {
    this.setState({editCommentModalOpen: false});
  };

  deleteComment = () => {
    const comment = this.props.comment;
    const commentId = comment.id;
    this.props.deleteComment(commentId);
  }

  vote = (voteType) => {
    const comment = this.props.comment;
    const commentId = comment.id;
    this.props.vote(commentId, voteType);
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
    return (
      <section>
        <FlatButton
          title='Upvote'
          icon={<UpArrow />}
          onClick={() => this.vote('up')}
         />
         <strong>{ comment.votes}</strong>
         <FlatButton
           title='Downvote'
           icon={<DownArrow />}
           onClick={() => this.vote('down')}
          />
        <strong>{ comment.author }</strong>
        <p>{ comment.body }</p>
        <RaisedButton
          label='Edit'
          onClick={this.handleOpen}
         />
        <Dialog
          title="Edit Comment"
          actions={actions}
          modal={true}
          open={this.state.editCommentModalOpen}
        >
          <EditCommentForm
            comment={comment}
            handleClose={this.handleClose.bind(this)} />
        </Dialog>
        <RaisedButton
          label='Delete'
          onClick={this.deleteComment.bind(this)}
        />
      </section>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteComment: (id) => dispatch(apiCommentDelete(id)),
    vote: (id, voteType) => dispatch(apiVoteComment(id, voteType))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Comment);
