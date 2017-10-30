import axios from 'axios';
const api = 'http://localhost:5001';

export const addReply = async (parentId, reply) => {
  const response = await axios.post(`${api}/api/replies/${parentId}`, {
    text: reply
  })
  return response;
}
