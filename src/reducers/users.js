import { SET_CURRENT_USER } from '../actions/users';
import { isEmpty } from '../helpers';

export function auth(state = { isAuthenticated: false, user: {} }, action) {
  switch(action.type) {
    case SET_CURRENT_USER :
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default :
      return state
  }
}

export default auth;
