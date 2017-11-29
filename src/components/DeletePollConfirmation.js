import React, { Component } from 'react';
import { apiPollDelete } from '../actions/polls';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { addFlashMessage } from '../actions/flashMessages';

class DeletePollConfirmation extends Component {

  handleSubmit(e) {
    e.preventDefault();

    const id = this.props.poll.id;
    this.props.deletePoll(id);
    this.props.addFlashMessage({
      type: 'success',
      text: 'Poll Deleted!'
    })
    this.props.handleClose();
  }

  render() {
    const poll = this.props.poll;
    const title = poll.title;
    return (
      <section style={{margin: 20}}>
        <form>
          <h1>{`Are you sure you want to delete the poll "${title}"?`}</h1>
          <RaisedButton label="Delete" secondary={true} onClick={this.handleSubmit.bind(this)} />
        </form>
      </section>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deletePoll: (id) => dispatch(apiPollDelete(id)),
    addFlashMessage: (message) => dispatch(addFlashMessage(message))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DeletePollConfirmation);
