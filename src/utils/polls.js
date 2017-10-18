import axios from 'axios';
const api = 'http://localhost:5001';

export async function getPolls() {
  const response = await axios.get(`${api}/api/polls`)
  return response;
}

export async function getPoll(id) {
  // Only these show pages will work for now since they are hardcoded
  const response = await axios.get(`${api}/api/polls`)
  return response;
}

export const addPoll = async (poll) => {
  const response = await axios.post(`${api}/api/add`, {
    title: poll.title,
    category: poll.category,
    choices: [...poll.choices]
  })
  return response;
}
