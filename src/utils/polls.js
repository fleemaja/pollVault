import axios from 'axios';
const api = 'http://localhost:5001';

export async function getPolls() {
  const response = await axios.get(`${api}/api/polls`)
  return response;
}

export async function getPollBySlug(slug) {
  // Only these show pages will work for now since they are hardcoded
  const response = await axios.get(`${api}/api/poll/${slug}`)
  return response;
}

export async function searchPolls(searchQuery) {
  const response = axios.get(`${api}/api/search?q=${searchQuery}`);
  return response;
}

export function deletePoll(id) {
  axios.delete(`${api}/api/polls/${id}`)
}

export const addPoll = async (poll) => {
  const response = await axios.post(`${api}/api/add`, {
    title: poll.title,
    category: poll.category,
    choices: [...poll.choices]
  })
  return response;
}

export const vote = async (pollId, choiceId) => {
  const response = await axios.post(`${api}/api/polls/${pollId}/vote`, {
    choiceId
  })
  return response;
}
