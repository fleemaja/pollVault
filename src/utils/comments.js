const comments = [
  {
    parentId: '0',
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo'
  },
  {
    parentId: '1',
    body: 'Comments. Are. Cool.',
    author: 'thingone'
  },
  {
    parentId: '1',
    body: 'Shimmy Shimmy Cocoa Puff',
    author: 'thingtwo'
  }
]

export function getCommentsByPoll(pollId) {
  const cs = comments.filter(c => c.parentId === pollId)
  return Promise.resolve(cs)
}

export function addComment(parentId, comment) {
  const c = {
    parentId,
    author: comment.author,
    body: comment.body
  }
  return Promise.resolve(c)
}
