import React, { Component } from 'react';
import { apiAddPoll } from '../actions/polls';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class AddPollForm extends Component {
  state = {
    title: ''
  }

  handleSubmit(e) {
    e.preventDefault();

    const { title } = this.state;
    if (title !== '') {
      this.props.addPoll({ title });
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
    addPoll: (poll) => dispatch(apiAddPoll(poll))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AddPollForm);
