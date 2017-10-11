const Validator = require('validator')

function isEmpty(obj) {
  return Object.keys(obj).length === 0
  && obj.constructor === Object
}

export default function validateInput(data) {
  let errors = {};
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required'
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
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
