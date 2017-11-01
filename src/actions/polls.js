import * as PollsStorage from '../utils/polls';

import { addFlashMessage } from './flashMessages';

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

export function votePoll(id, choice) {
  return {
    type: VOTE_POLL,
    id,
    choice
  }
};

export const fetchPolls = () => dispatch => (
  PollsStorage
    .getPolls()
    .then(response => dispatch(receivePolls(response.data.polls)))
    .catch(error => {
      if (!error.response) {
        const msg = { type: "error", text: "Network Error. Check your internet connection" };
        dispatch(addFlashMessage(msg))
      }
    })
);

export const apiSearchPolls = (searchQuery) => dispatch => (
  PollsStorage
    .searchPolls(searchQuery)
    .then(response => dispatch(receivePolls(response.data.polls)))
    .catch(error => {
      if (!error.response) {
        const msg = { type: "error", text: "Network Error. Check your internet connection" };
        dispatch(addFlashMessage(msg))
      }
    })
)

export const apiAddPoll = (poll) => dispatch => (
  PollsStorage
    .addPoll(poll)
    .then(res => dispatch(addPoll(res.data.poll)))
    .catch(error => {
      if (!error.response) {
        const msg = { type: "error", text: "Network Error. Check your internet connection" };
        dispatch(addFlashMessage(msg))
      }
    })
);

export const apiPollDelete = (id) => dispatch => {
  PollsStorage
    .deletePoll(id)
    .then(res => dispatch(pollDelete(res.data.id)))
    .catch(error => {
      if (!error.response) {
        const msg = { type: "error", text: "Network Error. Check your internet connection" };
        dispatch(addFlashMessage(msg))
      }
    })
};

export const apiVotePoll = (pollId, choiceId) => dispatch => {
  PollsStorage
    .vote(pollId, choiceId)
    .then(res => dispatch(votePoll(res.data.id, res.data.choice)))
    .catch(error => {
      if (!error.response) {
        const msg = { type: "error", text: "Network Error. Check your internet connection" };
        dispatch(addFlashMessage(msg))
      }
    })
};
