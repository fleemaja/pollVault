import React, { Component } from 'react';
import { apiAddReply } from '../actions/comments';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import { letterToHexColor } from '../helpers';
import { addFlashMessage } from '../actions/flashMessages';

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
      this.props.addFlashMessage({
        type: 'success',
        text: 'Reply Added!'
      })
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
            <Avatar size={30} src={`../uploads/${user.photo}`} alt="" /> :
            <Avatar size={30} style={{backgroundColor: letterToHexColor[letter.toLowerCase()] || '#ddd', color: '#333'}}>{ letter }</Avatar>
          }
          <TextField
            value={reply}
            name="reply"
            aria-label="Add a Public Reply"
            maxLength={500}
            onChange={this.handleInput.bind(this)}
            hintText="Add a Public Reply"
            style={{display: 'inline-block', width: 'calc(100% - 60px)', marginLeft: 10}}
          />
          <section style={{display: 'block', float: 'right'}}>
            <FlatButton label="Cancel" onClick={this.handleCancel.bind(this)} />
            <RaisedButton
              label="Reply"
              disabled={reply === ''}
              primary={true}
              onClick={this.handleSubmit.bind(this)} />
          </section>
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
    addReply: (commentId, reply) => dispatch(apiAddReply(commentId, reply)),
    addFlashMessage: (message) => dispatch(addFlashMessage(message))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddReplyForm);
