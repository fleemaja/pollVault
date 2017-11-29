import React, { Component } from 'react';
import { apiCommentDelete } from '../actions/comments';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { addFlashMessage } from '../actions/flashMessages';

class DeleteCommentConfirmation extends Component {

  handleSubmit(e) {
    e.preventDefault();

    const id = this.props.comment.id;
    this.props.deleteComment(id);
    this.props.addFlashMessage({
      type: 'success',
      text: 'Comment Deleted!'
    })
    this.props.handleClose();
  }

  render() {
    const comment = this.props.comment
    const text = comment.text
    const renderedText = text.length > 140 ? `${text.substring(0, 140)}...` : text;
    return (
      <section style={{margin: 20}}>
        <form>
          <h1>{`Are you sure you want to delete the comment "${renderedText}"?`}</h1>
          <RaisedButton label="Delete" secondary={true} onClick={this.handleSubmit.bind(this)} />
        </form>
      </section>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteComment: (id) => dispatch(apiCommentDelete(id)),
    addFlashMessage: (message) => dispatch(addFlashMessage(message))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DeleteCommentConfirmation);
