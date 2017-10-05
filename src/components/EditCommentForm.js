import React, { Component } from 'react';
import { apiEditComment } from '../actions/comments';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class EditCommentForm extends Component {
  state = {
    body: ''
  }

  componentWillMount = () => {
    const comment = this.props.comment;
    this.setState({ body: comment.body })
  }

  handleSubmit(e) {
    e.preventDefault();

    const id = this.props.comment.id;
    const { body } = this.state;
    if (body !== '') {
      this.props.editComment(id, body);
      this.props.handleClose();
      this.setState({ body: '' })
    }
  }

  handleInput(e) {
    const body = e.target.value;
    this.setState({ body })
  }

  render() {
    const { body } = this.state
    return (
      <section style={{margin: 20}}>
        <form>
          <TextField
            value={body}
            onChange={this.handleInput.bind(this)}
            hintText="Comment Body"
            floatingLabelText="Comment Body"
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
    editComment: (id, comment) => dispatch(apiEditComment(id, comment))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(EditCommentForm);
