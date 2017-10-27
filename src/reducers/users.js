import { SET_CURRENT_USER, SET_CURRENT_USER_PHOTO } from '../actions/users';
import { isEmpty } from '../helpers';

export function auth(state = { isAuthenticated: false, user: {} }, action) {
  switch(action.type) {
    case SET_CURRENT_USER :
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case SET_CURRENT_USER_PHOTO :
      return {
        ...state,
        user: { ...state.user, photo: action.photo }
      }
    default :
      return state
  }
}

export default auth;
