const comments = [
  {
    id: '0',
    parentId: '0',
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    votes: 3
  },
  {
    id: '1',
    parentId: '1',
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    votes: -7
  },
  {
    id: '2',
    parentId: '1',
    body: 'Shimmy Shimmy Cocoa Puff',
    author: 'thingtwo',
    votes: 31
  }
]

export function getCommentsByPoll(pollId) {
  const cs = comments.filter(c => c.parentId === pollId)
  return Promise.resolve(cs)
}

export function addComment(parentId, comment) {
  const id = Math.random() * (2**64);
  const c = {
    id,
    parentId,
    author: comment.author,
    body: comment.body
  }
  return Promise.resolve(c)
}
