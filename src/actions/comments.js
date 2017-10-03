import * as CommentsStorage from '../utils/comments'

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

export const getCommentsByPoll = (pollId) => dispatch => (
  CommentsStorage
    .getCommentsByPoll(pollId)
    .then(comments => dispatch(receiveComments(comments)))
);
