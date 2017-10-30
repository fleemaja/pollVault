import {
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  ADD_COMMENT_REPLY,
  DELETE_COMMENT,
  DELETE_COMMENT_REPLY,
  EDIT_COMMENT,
  VOTE_COMMENT,
  VOTE_COMMENT_REPLY
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
      return state.map(comment => (
        (comment.id === action.reply.comment)
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                action.reply
              ]
            }
          : comment
      ))
    case DELETE_COMMENT :
      return state.filter(comment => (comment.id !== action.id))
    case DELETE_COMMENT_REPLY :
      return state.map(comment => (
        (comment.id === action.commentId)
        ? {
            ...comment,
            'replies': comment.replies.filter(r => r.id !== action.replyId)
          }
        : comment
      ))
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
    case VOTE_COMMENT_REPLY :
      // YIKES
      return state.map(comment =>
        (comment.id === action.commentId)
          ? {
              ...comment,
              replies: comment.replies.map(reply => (
                (reply.id === action.replyId)
                ? {
                    ...reply,
                    'votes': action.userHasAlreadyVotedBefore ?
                      reply.votes.map(v => (
                        (v.author === action.vote.author) ?
                          { ...v, isUpvote: action.vote.isUpvote} :
                          v
                      )) : [
                        action.vote,
                        ...reply.votes
                      ]
                  }
                : reply
              ))
            }
          : comment
      )
    default :
      return state
  }
}
