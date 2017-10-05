import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { apiCommentDelete } from '../actions/comments';

class Comment extends Component {

  deleteComment = () => {
    const comment = this.props.comment;
    const commentId = comment.id;
    this.props.deleteComment(commentId);
  }

  render() {
    const comment = this.props.comment
    return (
      <section>
        <strong>{ comment.author }</strong>
        <p>{ comment.body }</p>
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
