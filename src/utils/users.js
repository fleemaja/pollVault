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

export const updateUserAvatar = (photo) => {
  const formData = new FormData();
  formData.append("photo", photo);
  const response = axios.post(`${api}/api/account`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  })
  return response;
}

export const getCurrentUserPhoto = () => {
  const response = axios.get(`${api}/api/account/photo`);
  return response;
}

export const isUsernameAlreadyRegistered = (username) => {
  const response = axios.get(`${api}/api/users?username=${username}`);
  return response;
}

export const isEmailAlreadyRegistered = (email) => {
  const response = axios.get(`${api}/api/users?email=${email}`);
  return response;
}
