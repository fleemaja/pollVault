import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { apiLoginUser } from '../actions/users';
import validateInput from '../utils/validations/login';
import { addFlashMessage } from '../actions/flashMessages';

class Login extends Component {

  state = {
    identifier: '',
    password: '',
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
      this.props.loginUser(this.state)
        .then(res => {
          if (res.isValid) {
            this.props.addFlashMessage({
              type: 'success',
              text: 'You Have Successfully Logged in!'
            })
            this.props.handleClose()
          } else {
            this.setState({ errors: message.errors, isLoading: false })
          }
        })
    }
  }

  render() {
    const { identifier, password, errors } = this.state

    return (
      <section style={{margin: 20}}>
        <form>
          <TextField
            value={identifier}
            name='identifier'
            onChange={this.handleInput.bind(this)}
            hintText="Username or Email"
            floatingLabelText="Username or Email"
            errorText={errors['identifier']}
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
    loginUser: (user) => dispatch(apiLoginUser(user)),
    addFlashMessage: (message) => dispatch(addFlashMessage(message))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Login);
