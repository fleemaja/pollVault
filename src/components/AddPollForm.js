import React, { Component } from 'react';
import { apiAddPoll } from '../actions/polls';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { categories } from '../helpers';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import validateInput from '../utils/validations/polls';

class AddPollForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
      return {
        title: '',
        category: '',
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
        ],
        errors: {},
        isValid: false
      }
    }

  validateForm = () => {
    const { title, category, inputs } = this.state;
    const choices = inputs.map(i => i['value']).filter(v => v !== '');
    const { isValid } = validateInput({ title, category, choices });
    this.setState({ isValid })
  }

  handleSubmit(e) {
    e.preventDefault();

    const { title, category, inputs } = this.state;
    const choices = inputs.map(i => i['value']).filter(v => v !== '');
    const { errors, isValid } = validateInput({ title, category, choices });
    if (isValid) {
      this.props.addPoll({ title, category, choices })
      this.props.handleClose()
      this.setState(this.initialState);
    } else {
      this.setState({ errors })
    }
  }

  handleInput(e) {
    const newVal = e.target.value;
    const property = e.target.name;

    const updatedState = {}
    updatedState[property] = newVal

    this.setState(updatedState)
  }

  handleCategoryChange = (event, index, value) =>
    this.setState({category: value});

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
    const { title, category, inputs, numberOfInputs, errors, isValid } = this.state
    return (
      <section style={{margin: 20}}>
        <form onChange={this.validateForm}>
          <TextField
            value={title}
            name="title"
            onChange={this.handleInput.bind(this)}
            maxLength={140}
            floatingLabelText="Poll Title"
            floatingLabelFixed={true}
            underlineStyle={{borderColor: '#363636'}}
            errorText={errors['title']}
            style={{display: 'block'}}
          />
          <SelectField
            floatingLabelText="Category"
            floatingLabelFixed={true}
            value={category}
            name="category"
            errorText={errors['category']}
            onChange={this.handleCategoryChange}
          >
            {
              categories.map(c =>
                <MenuItem value={c} primaryText={c} />
              )
            }
          </SelectField>
          <section>
            {
              inputs.map(i => {
                const choiceNum = parseInt(i['name'].split("-")[1], 10);
                return (<TextField
                      value={i['value']}
                      name={i['name']}
                      maxLength={140}
                      onChange={this.handleOptionInput.bind(this)}
                      hintText={'Poll requires at least two choices'}
                      errorText={errors['choices'] && errors['choices'][choiceNum - 1]}
                      floatingLabelText={`Choice ${choiceNum}`}
                      floatingLabelFixed={true}
                    />)
              })
            }
          </section>
          {
            numberOfInputs < 4 &&
              <FlatButton
                label="+ Add a choice"
                onClick={this.appendInput.bind(this)} />
          }
          <RaisedButton
            label="Submit"
            disabled={!isValid}
            onClick={this.handleSubmit.bind(this)} />
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
