import * as UsersStorage from '../utils/users'

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const loginUser = user => ({
  type: LOGIN_USER,
  user
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});

export const apiSignupUser = (user) => dispatch => (
  UsersStorage.signup(user)
);

export const apiLoginUser = (user) => dispatch => (
  UsersStorage
    .login(user)
    .then(res => {
      if (res.success) {
        dispatch(loginUser(user))
      }
      return res
    })
);

export const apiLogoutUser = () => dispatch => {
  UsersStorage
    .logout()
    .then((res) => {
      dispatch(logoutUser())
      return res
    })
}
