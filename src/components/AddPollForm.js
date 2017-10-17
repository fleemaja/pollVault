import React, { Component } from 'react';
import { apiAddPoll } from '../actions/polls';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class AddPollForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
      return {
        title: '',
        numberOfInputs: 2,
        inputs: [
          {
            name: 'option-1',
            value: ''
          },
          {
            name: 'option-2',
            value: ''
          }
        ]
      }
    }

  handleSubmit(e) {
    e.preventDefault();

    const { title, inputs } = this.state;
    const options = inputs.map(i => i['value']).filter(v => v !== '');
    if (title !== '' && options.length >= 2) {
      this.props.addPoll({ title, options })
      this.props.handleClose()
      this.state(this.initialState);
    }
  }

  handleInput(e) {
    const newVal = e.target.value;
    const property = e.target.name;

    const updatedState = {}
    updatedState[property] = newVal

    this.setState(updatedState)
  }

  appendInput() {
    const { inputs, numberOfInputs } = this.state
    if (numberOfInputs < 4) {
      const newInput = { 'name': `option-${numberOfInputs + 1}`, 'value': '' }
      const newInputs = inputs.concat(newInput)
      this.setState({ 'inputs': newInputs, 'numberOfInputs': numberOfInputs + 1})
    }
  }

  handleOptionInput(e) {
    const newVal = e.target.value;
    const property = e.target.name;

    const inputs = this.state.inputs.map(i =>
      i['name'] === property ? { ...i, 'value': newVal } : i
    )

    this.setState({ inputs })
  }

  render() {
    const { title, inputs, numberOfInputs } = this.state
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
          {
            inputs.map(i =>
              <TextField
                value={i['value']}
                name={i['name']}
                onChange={this.handleOptionInput.bind(this)}
                hintText={"Choice " + i['name'].split("-")[1]}
                floatingLabelText={"Choice " + i['name'].split("-")[1]}
                style={{display: 'block'}}
              />
            )
          }
          {
            numberOfInputs < 4 &&
              <FlatButton
                label="+ Add a choice"
                onClick={this.appendInput.bind(this)} />
          }
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
