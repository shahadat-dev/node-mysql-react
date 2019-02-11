const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = validateLoginInput = data => {
  let errors = {}

  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if (!Validator.isLength(data.email, { max: 50 })) {
    errors.email = 'Email must be less than 50 characters'
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  }

  if (!Validator.isLength(data.password, { min: 8, max: 20 })) {
    errors.password = 'Password must be at least 8 characters'
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
