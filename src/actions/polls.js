import * as PollsStorage from '../utils/polls'

export const RECEIVE_POLLS = "RECEIVE_POLLS";
export const ADD_POLL = "ADD_POLL";
export const DELETE_POLL = "DELETE_POLL";
export const EDIT_POLL = "EDIT_POLL";
export const VOTE_POLL = "VOTE_POLL";

export const receivePolls = polls => ({
  type: RECEIVE_POLLS,
  polls
});

export function addPoll(poll) {
  return {
    type: ADD_POLL,
    poll
  }
};

export function pollDelete(id) {
  return {
    type: DELETE_POLL,
    id
  }
};

export function editPoll(poll) {
  return {
    type: EDIT_POLL,
    poll
  }
};

export function votePoll(id, option) {
  return {
    type: VOTE_POLL,
    id,
    option
  }
};

export const fetchPolls = () => dispatch => (
  PollsStorage
    .getPolls()
    .then(response => dispatch(receivePolls(response.data.polls)))
);

export const apiAddPoll = (poll) => dispatch => (
  PollsStorage
    .addPoll(poll)
    .then(res => dispatch(addPoll(res.data.poll)))
);

export const apiEditPoll = (poll) => dispatch => (
  dispatch(editPoll(poll))
);

export const apiPollDelete = (id) => dispatch => {
  PollsStorage.deletePoll(id);
  dispatch(pollDelete(id));
};

export const apiVotePoll = (id, option) => dispatch => (
  dispatch(votePoll(id, option))
);

export const fetchPoll = (id) => (
  PollsStorage.getPoll(id)
)
