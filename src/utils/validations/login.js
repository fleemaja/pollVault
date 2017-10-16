const Validator = require('validator')

function isEmpty(obj) {
  return Object.keys(obj).length === 0
  && obj.constructor === Object
}

export default function validateInput(data) {
  let errors = {};
  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = 'Username or email is required'
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
