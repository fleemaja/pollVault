import React, { Component } from 'react';
import { apiAddPoll } from '../actions/polls';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class AddPollForm extends Component {
  state = {
    title: '',
    optionOne: '',
    optionTwo: ''
  }

  handleSubmit(e) {
    e.preventDefault();

    const { title, optionOne, optionTwo } = this.state;
    if (title !== '' && optionOne !== '' && optionTwo !== '') {
      this.props.addPoll({ title, options: [optionOne, optionTwo] })
      this.props.handleClose()
      this.setState({ title: '', optionOne: '', optionTwo })
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
    const { title, optionOne, optionTwo } = this.state
    return (
      <section style={{margin: 20}}>
        <form>
          <TextField
            value={title}
            name="title"
            onChange={this.handleInput.bind(this)}
            hintText="Poll Title"
            floatingLabelText="Poll Title"
            style={{display: 'block'}}
          />
          <TextField
            value={optionOne}
            name="optionOne"
            onChange={this.handleInput.bind(this)}
            hintText="Option #1"
            floatingLabelText="Option #1"
            style={{display: 'block'}}
          />
          <TextField
            value={optionTwo}
            name="optionTwo"
            onChange={this.handleInput.bind(this)}
            hintText="Option #2"
            floatingLabelText="Option #2"
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
