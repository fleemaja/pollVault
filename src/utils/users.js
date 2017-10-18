import axios from 'axios';

const api = 'http://localhost:5001';

export const signup = (user) => {
  const response = axios.post(`${api}/api/register`, {
    'username': user.username,
    'email': user.email,
    'password': user.password,
    'password-confirm': user.passwordConfirmation
  })
  return response
}

export const login = (user) =>
  axios.post(`${api}/api/login`, {
    username: user.username,
    password: user.password
  })

export const logout = () =>
  axios.get(`${api}/api/logout`)
