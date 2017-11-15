import React, { Component } from 'react';
import { apiAddReply } from '../actions/comments';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import { letterToHexColor } from '../helpers';

class AddReplyForm extends Component {
  state = {
    reply: ''
  }

  handleSubmit(e) {
    e.preventDefault();

    const { reply } = this.state;
    const commentId = this.props.commentId;
    if (commentId !== '' && reply !== '') {
      this.props.addReply(commentId, reply)
      this.props.hideReplyForm();
      this.setState({ reply: '' });
    }
  }

  handleCancel() {
    this.props.hideReplyForm();
    this.setState({ reply: '' });
  }

  handleInput(e) {
    const newVal = e.target.value;
    const property = e.target.name;

    const updatedState = {}
    updatedState[property] = newVal

    this.setState(updatedState)
  }

  render() {
    const { reply } = this.state
    const user = this.props.auth.user;
    const letter = user.username.charAt(0);
    return (
      <section style={{margin: 20}}>
        <form>
          {
            user.photo ?
            <Avatar src={`../uploads/${user.photo}`} /> :
            <Avatar style={{backgroundColor: letterToHexColor[letter.toLowerCase()] || '#ddd', color: '#333'}}>{ letter }</Avatar>
          }
          <TextField
            value={reply}
            name="reply"
            maxLength={500}
            onChange={this.handleInput.bind(this)}
            hintText="Add a Public Reply"
            style={{display: 'block'}}
          />
          <FlatButton label="Cancel" onClick={this.handleCancel.bind(this)} />
          <RaisedButton
            label="Submit"
            disabled={reply === ''}
            onClick={this.handleSubmit.bind(this)} />
        </form>
      </section>
    )
  }
}

function mapStateToProps ({ auth }) {
  return { auth }
}

function mapDispatchToProps(dispatch) {
  return {
    addReply: (commentId, reply) => dispatch(apiAddReply(commentId, reply))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddReplyForm);
