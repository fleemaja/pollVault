import * as UsersStorage from '../utils/users'

export const apiSignupUser = (user) => dispatch => (
  UsersStorage.signup(user)
);
