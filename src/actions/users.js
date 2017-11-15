import * as UsersStorage from '../utils/users';

import { addFlashMessage } from './flashMessages';

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
          .catch(error => {
            if (!error.response) {
              const msg = { type: "error", text: "Network Error. Check your internet connection" };
              dispatch(addFlashMessage(msg))
            }
          })
        return res;
      }
    )
    .catch(error => {
      if (!error.response) {
        const msg = { type: "error", text: "Network Error. Check your internet connection" };
        dispatch(addFlashMessage(msg))
        return { success: false }
      } else {
        return { success: false, errorMessages: error.response.data }
      }
    })
);

export const apiLoginUser = (user) => dispatch => (
  UsersStorage
    .login(user)
    .then(res => {
        if (res.data.success) {
          const token = res.data.token;
          localStorage.setItem('jwtToken', token);
          setAuthorizationToken(token);
          dispatch(setCurrentUser(jwtDecode(token)));
          UsersStorage
            .getCurrentUserPhoto()
            .then(res => dispatch(setCurrentUserPhoto(res.data.photo)))
            .catch(error => {
              if (!error.response) {
                const msg = { type: "error", text: "Network Error. Check your internet connection" };
                dispatch(addFlashMessage(msg))
              }
            })
        }
        return res;
      }
    )
    .catch(error => {
      if (!error.response) {
        const msg = { type: "error", text: "Network Error. Check your internet connection" };
        dispatch(addFlashMessage(msg))
      }
    })
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
        .catch(error => {
          if (!error.response) {
            const msg = { type: "error", text: "Network Error. Check your internet connection" };
            dispatch(addFlashMessage(msg))
          }
        })
      return res;
    })
    .catch(error => {
      if (!error.response) {
        const msg = { type: "error", text: "Network Error. Check your internet connection" };
        dispatch(addFlashMessage(msg))
      }
    })
}

export const apiUpdateUserAvatar = (photo) => dispatch => (
  UsersStorage
    .updateUserAvatar(photo)
    .then(res => {
      UsersStorage
        .getCurrentUserPhoto()
        .then(res => dispatch(setCurrentUserPhoto(res.data.photo)))
        .catch(error => {
          if (!error.response) {
            const msg = { type: "error", text: "Network Error. Check your internet connection" };
            dispatch(addFlashMessage(msg))
          }
        })
      return res;
    })
    .catch(error => {
      if (!error.response) {
        const msg = { type: "error", text: "Network Error. Check your internet connection" };
        dispatch(addFlashMessage(msg))
      }
    })
)
