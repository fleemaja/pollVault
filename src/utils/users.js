const api = 'http://localhost:5001';

export const signup = (user) =>
  fetch(`${api}/api/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'username': user.username,
      'email': user.email,
      'password': user.password,
      'password-confirm': user.passwordConfirmation
    })
  }).then(res => res.json())
    .then(data => data)
