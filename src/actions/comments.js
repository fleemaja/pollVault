import * as CommentsStorage from '../utils/comments'

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_COMMENT_REPLY = "ADD_COMMENT_REPLY";
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

export function addReply(reply) {
  return {
    type: ADD_COMMENT_REPLY,
    reply
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

export function voteComment(id, vote, userHasAlreadyVotedBefore) {
  return {
    type: VOTE_COMMENT,
    id,
    vote,
    userHasAlreadyVotedBefore
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

export const apiAddReply = (parentId, reply) => dispatch => (
  CommentsStorage
    .addReply(parentId, reply)
    .then(res => dispatch(addReply(res.data.reply)))
);

export const apiVoteComment = (id, isUpvote) => dispatch => (
  CommentsStorage
      .voteComment(id, isUpvote)
      .then(res => dispatch(voteComment(res.data.commentId, res.data.newCommentVote, res.data.userHasAlreadyVotedBefore)))
);

export const apiEditComment = (id, comment) => dispatch => (
  dispatch(editComment(id, comment))
);

export const apiCommentDelete = (id) => dispatch => {
  CommentsStorage.deleteComment(id);
  dispatch(commentDelete(id));
};
