import React, { Component } from 'react';
import { apiReplyDelete } from '../actions/comments';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { addFlashMessage } from '../actions/flashMessages';

class DeleteReplyConfirmation extends Component {

  handleSubmit(e) {
    e.preventDefault();

    const commentId = this.props.commentId;
    const replyId = this.props.reply.id;
    this.props.deleteReply(commentId, replyId);
    this.props.addFlashMessage({
      type: 'success',
      text: 'Reply Deleted!'
    })
    this.props.handleClose();
  }

  render() {
    const reply = this.props.reply
    const text = reply.text
    const renderedText = text.length > 140 ? `${text.substring(0, 140)}...` : text;
    return (
      <section style={{margin: 20}}>
        <form>
          <h1>{`Are you sure you want to delete the reply "${renderedText}"?`}</h1>
          <RaisedButton label="Delete" secondary={true} onClick={this.handleSubmit.bind(this)} />
        </form>
      </section>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteReply: (commentId, replyId) => dispatch(apiReplyDelete(commentId, replyId)),
    addFlashMessage: (message) => dispatch(addFlashMessage(message))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DeleteReplyConfirmation);
