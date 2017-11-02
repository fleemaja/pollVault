import {
  isUsernameAlreadyRegistered,
  isEmailAlreadyRegistered
} from '../users';

const Validator = require('validator');

function isEmpty(obj) {
  return Object.keys(obj).length === 0
}

export default async function validateInput(data) {
  let errors = {};
  const usernameUser = await isUsernameAlreadyRegistered(data.username);
  const emailUser = await isEmailAlreadyRegistered(data.email);
  if (!isEmpty(usernameUser)) {
    errors.username = 'That Username is already registered'
  }
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required'
  }
  if (!isEmpty(emailUser)) {
    errors.email = 'That Email is already registered'
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }
  if (data.password.length < 6) {
    errors.password = 'Your password must be at least 6 characters.'
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Password Confirmation is required'
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
