const clone = require('clone')

let db = {}

function signup(token, user) {
  console.log(JSON.stringify(user))
  return Promise.resolve(JSON.stringify(user))
}

module.exports = {
  signup,
}
