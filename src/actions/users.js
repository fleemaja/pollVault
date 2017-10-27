import * as UsersStorage from '../utils/users';

import { setAuthorizationToken } from '../utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_CURRENT_USER_PHOTO = "SET_CURRENT_USER_PHOTO";

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export const setCurrentUserPhoto = photo => ({
  type: SET_CURRENT_USER_PHOTO,
  photo
});

export const apiSignupUser = (user) => dispatch => (
  UsersStorage
    .signup(user)
    .then(res => {
        const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwtDecode(token)))
        UsersStorage
          .getCurrentUserPhoto()
          .then(res => dispatch(setCurrentUserPhoto(res.data.photo)))
        return res;
      }
    )
);

export const apiLoginUser = (user) => dispatch => (
  UsersStorage
    .login(user)
    .then(res => {
        const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwtDecode(token)));
        UsersStorage
          .getCurrentUserPhoto()
          .then(res => dispatch(setCurrentUserPhoto(res.data.photo)))
        return res;
      }
    )
);

export const apiLogoutUser = () => dispatch => {
  UsersStorage
    .logout()
    .then(res => {
      localStorage.removeItem('jwtToken');
      setAuthorizationToken(false);
      dispatch(setCurrentUser({}));
      UsersStorage
        .getCurrentUserPhoto()
        .then(res => dispatch(setCurrentUserPhoto(res.data.photo)))
      return res;
    })
}

export const apiUpdateUserAvatar = (photo) => dispatch => (
  UsersStorage
    .updateUserAvatar(photo)
    .then(res => {
      return res;
    })
)
