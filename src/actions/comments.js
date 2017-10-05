import * as CommentsStorage from '../utils/comments'

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
});

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
};

export function commentDelete(id) {
  return {
    type: DELETE_COMMENT,
    id
  }
};

export const getCommentsByPoll = (commentId) => dispatch => (
  CommentsStorage
    .getCommentsByPoll(commentId)
    .then(comments => dispatch(receiveComments(comments)))
);

export const apiAddComment = (parentId, comment) => dispatch => (
  CommentsStorage
      .addComment(parentId, comment)
      .then(c => dispatch(addComment(c)))
);

export const apiCommentDelete = (id) => dispatch => (
  dispatch(commentDelete(id))
);
