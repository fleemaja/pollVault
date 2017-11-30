import * as CommentsStorage from '../utils/comments';

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_COMMENT_REPLY = "ADD_COMMENT_REPLY";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const DELETE_COMMENT_REPLY = "DELETE_COMMENT_REPLY";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const VOTE_COMMENT = "VOTE_COMMENT";
export const VOTE_COMMENT_REPLY = "VOTE_COMMENT_REPLY";

export const receiveComments = (comments, sortType) => ({
  type: RECEIVE_COMMENTS,
  comments,
  sortType
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

export function replyDelete(commentId, replyId) {
  return {
    type: DELETE_COMMENT_REPLY,
    commentId,
    replyId
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

export function voteCommentReply(commentId, replyId, vote, userHasAlreadyVotedBefore) {
  return {
    type: VOTE_COMMENT_REPLY,
    commentId,
    replyId,
    vote,
    userHasAlreadyVotedBefore
  }
}

export const setAndSortComments = (comments, sortType) => dispatch => (
  dispatch(receiveComments(comments, sortType))
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

export const apiVoteReply = (id, isUpvote) => dispatch => (
  CommentsStorage
      .voteCommentReply(id, isUpvote)
      .then(res => dispatch(voteCommentReply(res.data.commentId, res.data.replyId, res.data.newReplyVote, res.data.userHasAlreadyVotedBefore)))
);

export const apiCommentDelete = (id) => dispatch => {
  CommentsStorage
    .deleteComment(id)
    .then(res => dispatch(commentDelete(res.data.id)))
};

export const apiReplyDelete = (commentId, replyId) => dispatch => {
  CommentsStorage
    .deleteCommentReply(replyId)
    .then(res => dispatch(replyDelete(commentId, replyId)))
}
