import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { apiCommentDelete } from '../actions/comments';
import Dialog from 'material-ui/Dialog';
import EditCommentForm from './EditCommentForm';

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
    deleteComment: (id) => dispatch(apiCommentDelete(id))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Comment);
