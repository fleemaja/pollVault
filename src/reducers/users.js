import { LOGIN_USER, LOGOUT_USER } from '../actions/users';

export function user(state = { authenticated: false, username: "" }, action) {
  switch(action.type) {
    case LOGIN_USER :
      return Object.assign({}, state, { authenticated: true, username: action.user.username })
    case LOGOUT_USER :
      return Object.assign({}, state, { authenticated: false, username: "" })
    default :
      return state
  }
}

export default user;