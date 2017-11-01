import * as CommentsStorage from '../utils/comments';

import { addFlashMessage } from './flashMessages';

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const ADD_COMMENT_REPLY = "ADD_COMMENT_REPLY";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const DELETE_COMMENT_REPLY = "DELETE_COMMENT_REPLY";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const VOTE_COMMENT = "VOTE_COMMENT";
export const VOTE_COMMENT_REPLY = "VOTE_COMMENT_REPLY";

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

export const setComments = (comments) => dispatch => (
  dispatch(receiveComments(comments))
);

export const apiAddComment = (parentId, comment) => dispatch => (
  CommentsStorage
      .addComment(parentId, comment)
      .then(res => dispatch(addComment(res.data.comment)))
      .catch(error => {
        if (!error.response) {
          const msg = { type: "error", text: "Network Error. Check your internet connection" };
          dispatch(addFlashMessage(msg))
        }
      })
);

export const apiAddReply = (parentId, reply) => dispatch => (
  CommentsStorage
    .addReply(parentId, reply)
    .then(res => dispatch(addReply(res.data.reply)))
    .catch(error => {
      if (!error.response) {
        const msg = { type: "error", text: "Network Error. Check your internet connection" };
        dispatch(addFlashMessage(msg))
      }
    })
);

export const apiVoteComment = (id, isUpvote) => dispatch => (
  CommentsStorage
      .voteComment(id, isUpvote)
      .then(res => dispatch(voteComment(res.data.commentId, res.data.newCommentVote, res.data.userHasAlreadyVotedBefore)))
      .catch(error => {
        if (!error.response) {
          const msg = { type: "error", text: "Network Error. Check your internet connection" };
          dispatch(addFlashMessage(msg))
        }
      })
);

export const apiVoteReply = (id, isUpvote) => dispatch => (
  CommentsStorage
      .voteCommentReply(id, isUpvote)
      .then(res => dispatch(voteCommentReply(res.data.commentId, res.data.replyId, res.data.newReplyVote, res.data.userHasAlreadyVotedBefore)))
      .catch(error => {
        if (!error.response) {
          const msg = { type: "error", text: "Network Error. Check your internet connection" };
          dispatch(addFlashMessage(msg))
        }
      })
);

export const apiCommentDelete = (id) => dispatch => {
  CommentsStorage
    .deleteComment(id)
    .then(res => dispatch(commentDelete(res.data.id)))
    .catch(error => {
      if (!error.response) {
        const msg = { type: "error", text: "Network Error. Check your internet connection" };
        dispatch(addFlashMessage(msg))
      }
    })
};

export const apiReplyDelete = (commentId, replyId) => dispatch => {
  CommentsStorage
    .deleteCommentReply(replyId)
    .then(res => dispatch(replyDelete(commentId, replyId)))
    .catch(error => {
      if (!error.response) {
        const msg = { type: "error", text: "Network Error. Check your internet connection" };
        dispatch(addFlashMessage(msg))
      }
    })
}
