import * as RepliesStorage from '../utils/replies';

export const ADD_REPLY = "ADD_REPLY";

export function addReply(reply) {
  return {
    type: ADD_REPLY,
    reply
  }
};

export const apiAddReply = (parentId, reply) => dispatch => (
  RepliesStorage
    .addReply(parentId, reply)
    .then(res => dispatch(addReply(res.data.reply)))
);
