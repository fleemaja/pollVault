import React, { Component } from 'react';
import { apiEditPoll } from '../actions/polls';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class EditPollForm extends Component {
  state = {
    title: ''
  }

  componentWillMount = () => {
    const poll = this.props.poll;
    this.setState({ title: poll.title })
  }

  handleSubmit(e) {
    e.preventDefault();

    const id = this.props.poll.id;
    const { title } = this.state;
    if (title !== '') {
      this.props.editPoll({ id, title });
      this.props.handleClose();
      this.setState({ title: '' })
    }
  }

  handleInput(e) {
    const title = e.target.value;
    this.setState({ title })
  }

  render() {
    const { title } = this.state
    return (
      <section style={{margin: 20}}>
        <form>
          <TextField
            value={title}
            onChange={this.handleInput.bind(this)}
            hintText="Poll Title"
            floatingLabelText="Poll Title"
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
    editPoll: (poll) => dispatch(apiEditPoll(poll))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(EditPollForm);
