import {
  RECEIVE_COMMENTS,
  ADD_COMMENT
} from '../actions/comments';

export function comments(state = [], action) {
  switch (action.type) {
    case RECEIVE_COMMENTS :
      return [
        ...action.comments
      ]
    case ADD_COMMENT :
      return [
        action.comment,
        ...state
      ]
    default :
      return state
  }
}
