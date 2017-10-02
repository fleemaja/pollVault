import * as PollsStorage from '../utils/polls'

export const RECEIVE_POLLS = "RECEIVE_POLLS";

export const receivePolls = polls => ({
  type: RECEIVE_POLLS,
  polls
});

export const fetchPolls = () => dispatch => (
  PollsStorage
    .getPolls()
    .then(polls => dispatch(receivePolls(polls)))
);
