import {
  RECEIVE_POLLS,
  ADD_POLL,
  DELETE_POLL,
  EDIT_POLL,
  VOTE_POLL
} from '../actions/polls';

export function polls(state = [], action) {
  switch (action.type) {
    case RECEIVE_POLLS :
      return [
        ...action.polls
      ]
    case ADD_POLL :
      return [
        { ...action.poll, hasVoted: false },
        ...state
      ]
    case DELETE_POLL :
      return state.filter(poll => (poll.id !== action.id))
    case EDIT_POLL :
      return state.map(poll =>
        (poll.id === action.id)
          ? {...poll, 'title': action.poll.title}
          : poll
      )
    case VOTE_POLL :
      return state.map(poll =>
        (poll.id === action.id)
          ? {...poll, hasVoted: true,
             choices: poll.choices.map((choice) =>
              (choice.id === action.choice.id) ? action.choice : choice
            )}
          : poll
      )
    default :
      return state
  }
}
