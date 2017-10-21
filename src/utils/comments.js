import axios from 'axios';
const api = 'http://localhost:5001';

export const addComment = async (parentId, comment) => {
  const response = await axios.post(`${api}/api/comments/${parentId}`, {
    text: comment.text
  })
  return response;
}

export function deleteComment(id) {
  axios.delete(`${api}/api/comments/comment/${id}`)
}

export const voteComment = async (id, isUpvote) => {
  const response = await axios.post(`${api}/api/comments/${id}/vote`, {
    isUpvote
  })
  return response;
}
