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
