import axios from 'axios';

export const signup = (user) => {
  const response = axios.post(`/api/register`, {
    'username': user.username,
    'email': user.email,
    'password': user.password,
    'password-confirm': user.passwordConfirmation
  })
  return response
}

export const login = (user) =>
  axios.post(`/api/login`, {
    username: user.username,
    password: user.password
  })

export const logout = () =>
  axios.get(`/api/logout`)

export const updateUserAvatar = (photo) => {
  const formData = new FormData();
  formData.append("photo", photo);
  const response = axios.post(`/api/account`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  })
  return response;
}

export const getCurrentUserPhoto = () => {
  const response = axios.get(`/api/account/photo`);
  return response;
}

export const isUsernameAlreadyRegistered = (username) => {
  const response = axios.get(`/api/users?username=${username}`);
  return response;
}

export const isEmailAlreadyRegistered = (email) => {
  const response = axios.get(`/api/users?email=${email}`);
  return response;
}
