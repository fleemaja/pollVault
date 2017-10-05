import {
  RECEIVE_POLLS,
  ADD_POLL,
  DELETE_POLL,
  EDIT_POLL
} from '../actions/polls';

export function polls(state = [], action) {
  switch (action.type) {
    case RECEIVE_POLLS :
      return [
        ...action.polls
      ]
    case ADD_POLL :
      return [
        action.poll,
        ...state
      ]
    case DELETE_POLL :
      return state.filter(poll => (poll.id !== action.id))
    case EDIT_POLL :
      return state.map(poll =>
        (poll.id === action.poll.id)
          ? {...action.poll}
          : poll
      )
    default :
      return state
  }
}
