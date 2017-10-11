const api = "http://localhost:5001"

const uuidv1 = require('uuid/v1');

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.haddoken
if (!token)
  token = localStorage.haddoken = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const signup = (user) =>
  fetch(`${api}/api/users`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'username': user.username,
      'email': user.email,
      'password': user.password
    })
  }).then(res => res.json())
    .then(data => data)
