import React, { Component } from 'react';
import { apiPollDelete } from '../actions/polls';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

class DeletePollConfirmation extends Component {

  handleSubmit(e) {
    e.preventDefault();

    const id = this.props.poll.id;
    this.props.deletePoll(id);

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
    deletePoll: (id) => dispatch(apiPollDelete(id))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DeletePollConfirmation);
