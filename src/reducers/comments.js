import {
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  ADD_COMMENT_REPLY,
  DELETE_COMMENT,
  EDIT_COMMENT,
  VOTE_COMMENT
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
    case ADD_COMMENT_REPLY :
      return state
    case DELETE_COMMENT :
      return state.filter(comment => (comment.id !== action.id))
    case EDIT_COMMENT :
      return state.map(comment =>
        (comment.id === action.id)
          ? {...comment, 'body': action.comment}
          : comment
      )
    case VOTE_COMMENT :
      return state.map(comment =>
        (comment.id === action.id)
          ? {
              ...comment,
              'votes': action.userHasAlreadyVotedBefore ?
                comment.votes.map(v => (
                  (v.author === action.vote.author) ?
                    { ...v, isUpvote: action.vote.isUpvote} :
                    v
                )) : [
                  action.vote,
                  ...comment.votes
                ]
            }
          : comment
      )
    default :
      return state
  }
}
