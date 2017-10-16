import { LOGIN_USER, LOGOUT_USER } from '../actions/users';

const defaultState = { authenticated: false, username: "" }

export function user(state = { authenticated: false, username: "" }, action) {
  switch(action.type) {
    case LOGIN_USER :
      return Object.assign({}, state, { authenticated: true, username: action.user.username })
    case LOGOUT_USER :
      alert("LOGGED THIS PUPPY OUT")
      return Object.assign({}, state, { authenticated: false, username: "" })
    default :
      return state
  }
}

export default user;
