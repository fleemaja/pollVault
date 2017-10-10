import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { apiCommentDelete, apiVoteComment } from '../actions/comments';
import Dialog from 'material-ui/Dialog';
import EditCommentForm from './EditCommentForm';
import Like from 'material-ui/svg-icons/action/thumb-up';
import Dislike from 'material-ui/svg-icons/action/thumb-down';
import Avatar from 'material-ui/Avatar';

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
      <section style={{textAlign: 'left', marginBottom: 20}}>
        <Avatar style={{marginRight: 10}}>A</Avatar>
        <strong>{ comment.author }</strong>
        <span style={{marginLeft: 10}}>4 hours ago</span>
        <p>{ comment.body }</p>
        <strong>{ comment.votes}</strong>
        <FlatButton
          title='Upvote'
          icon={<Like />}
          onClick={() => this.vote('up')}
         />
         <FlatButton
           title='Downvote'
           icon={<Dislike />}
           onClick={() => this.vote('down')}
          />
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
