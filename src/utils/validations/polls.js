const Validator = require('validator');

function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export default function validateInput(data) {
  let errors = {};
  let choices = new Array(4);
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required'
  }
  if (data.title.length > 140) {
    errors.title = 'Title must be under 140 characters'
  }
  if (Validator.isEmpty(data.category)) {
    errors.category = 'Category is required'
  }
  if (data.choices.length < 2) {
    choices[1] = 'Poll requires at least 2 choices'
  }
  for (let i = 0; i < data.choices.length; i++) {
    if (data.choices[i].length > 140) {
      choices[i] = "Choice must be under 140 characters"
    }
  }
  if (choices.some(x => x !== 'null')) {
    errors.choices = choices;
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
