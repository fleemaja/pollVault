import React, { Component } from 'react';
import { apiAddComment } from '../actions/comments';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class AddCommentForm extends Component {
  state = {
    author: '',
    body: ''
  }

  handleSubmit(e) {
    e.preventDefault();

    const { author, body } = this.state;
    const parentId = this.props.parentId;
    if (author !== '' && body !== '') {
      this.props.addComment(parentId, { author, body });
      this.setState({ author: '', body: '' })
    }
  }

  handleInput(e) {
    const newVal = e.target.value;
    const property = e.target.name;

    const updatedState = {}
    updatedState[property] = newVal

    this.setState(updatedState)
  }

  render() {
    const { author, body } = this.state
    return (
      <section style={{margin: 20}}>
        <h2>Add Comment</h2>
        <form>
          <TextField
            value={author}
            name='author'
            onChange={this.handleInput.bind(this)}
            hintText="Author"
            floatingLabelText="Author"
            style={{display: 'block'}}
          />
          <TextField
            value={body}
            name='body'
            onChange={this.handleInput.bind(this)}
            hintText="Comment"
            floatingLabelText="Comment"
            style={{display: 'block'}}
          />
          <RaisedButton label="Submit" onClick={this.handleSubmit.bind(this)} />
        </form>
      </section>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (parentId, comment) =>
      dispatch(apiAddComment(parentId, comment))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AddCommentForm);
