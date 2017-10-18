import * as CommentsStorage from '../utils/comments'

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const VOTE_COMMENT = "VOTE_COMMENT";

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

export function editComment(id, comment) {
  return {
    type: EDIT_COMMENT,
    id,
    comment
  }
};

export function voteComment(id, voteType) {
  return {
    type: VOTE_COMMENT,
    id,
    voteType
  }
}

export const setComments = (comments) => dispatch => (
  dispatch(receiveComments(comments))
);

export const apiAddComment = (parentId, comment) => dispatch => (
  CommentsStorage
      .addComment(parentId, comment)
      .then(res => dispatch(addComment(res.data.comment)))
);

export const apiVoteComment = (id, voteType) => dispatch => (
  dispatch(voteComment(id, voteType))
);

export const apiEditComment = (id, comment) => dispatch => (
  dispatch(editComment(id, comment))
);

export const apiCommentDelete = (id) => dispatch => (
  dispatch(commentDelete(id))
);
