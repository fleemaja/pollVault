import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { apiSignupUser } from '../actions/users';

class Signup extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.signupUser(this.state)
  }

  render() {
    const { username, email, password, passwordConfirmation } = this.state

    return (
      <MuiThemeProvider>
        <AppBar
          style={{backgroundColor: '#fff'}}
          titleStyle={{color: '#333'}}
          title="PollVault"
          showMenuIconButton={false}
        />
        <section style={{margin: 20}}>
          <h2>Signup</h2>
          <form>
            <TextField
              value={username}
              name='username'
              onChange={this.handleInput.bind(this)}
              hintText="Username"
              floatingLabelText="Username"
              style={{display: 'block'}}
            />
            <TextField
              value={email}
              name='email'
              onChange={this.handleInput.bind(this)}
              hintText="Email"
              floatingLabelText="Email"
              style={{display: 'block'}}
            />
            <TextField
              type="password"
              value={password}
              name='password'
              onChange={this.handleInput.bind(this)}
              hintText="Password"
              floatingLabelText="Password"
              style={{display: 'block'}}
            />
            <TextField
              type="password"
              value={passwordConfirmation}
              name='passwordConfirmation'
              onChange={this.handleInput.bind(this)}
              hintText="Password Confirmation"
              floatingLabelText="Password Confirmation"
              style={{display: 'block'}}
            />
            <RaisedButton label="Submit" onClick={this.handleSubmit.bind(this)} />
          </form>
        </section>
      </MuiThemeProvider>
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
