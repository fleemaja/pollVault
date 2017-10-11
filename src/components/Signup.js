import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { apiSignupUser } from '../actions/users';
import validateInput from '../utils/validations/signup';

class Signup extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: {},
    isLoading: false
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true })
      this.props.signupUser(this.state)
        .then(message => {
          if (message.isValid) {
            this.props.handleClose()
          } else {
            this.setState({ errors: message.errors, isLoading: false })
          }
        })
    }
  }

  render() {
    const { username, email, password, passwordConfirmation, errors } = this.state

    return (
      <section style={{margin: 20}}>
        <form>
          <TextField
            value={username}
            name='username'
            onChange={this.handleInput.bind(this)}
            hintText="Username"
            floatingLabelText="Username"
            errorText={errors['username']}
            style={{display: 'block'}}
          />
          <TextField
            value={email}
            name='email'
            onChange={this.handleInput.bind(this)}
            hintText="Email"
            floatingLabelText="Email"
            errorText={errors['email']}
            style={{display: 'block'}}
          />
          <TextField
            type="password"
            value={password}
            name='password'
            onChange={this.handleInput.bind(this)}
            hintText="Password"
            floatingLabelText="Password"
            errorText={errors['password']}
            style={{display: 'block'}}
          />
          <TextField
            type="password"
            value={passwordConfirmation}
            name='passwordConfirmation'
            onChange={this.handleInput.bind(this)}
            hintText="Password Confirmation"
            floatingLabelText="Password Confirmation"
            errorText={errors['passwordConfirmation']}
            style={{display: 'block'}}
          />
          <RaisedButton
            style={{marginTop: 40}}
            disabled={this.state.isLoading}
            label="Submit"
            onClick={this.handleSubmit.bind(this)} />
        </form>
      </section>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signupUser: (user) => dispatch(apiSignupUser(user))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Signup);