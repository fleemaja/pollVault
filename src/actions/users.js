import * as UsersStorage from '../utils/users'

export const SIGNUP_USER = "SIGNUP_USER";

export function signupUser(user) {
  return {
    type: SIGNUP_USER,
    user
  }
};

export const apiSignupUser = (user) => dispatch => (
  UsersStorage
    .signup(user)
    .then(u => dispatch(signupUser(u)))
);
