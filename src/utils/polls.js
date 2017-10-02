export function getPolls() {
  const polls = [
    {
      id: 0,
      title: 'NBA or NHL?'
    },
    {
      id: 1,
      title: 'Apples or Oranges?'
    },
    {
      id: 2,
      title: 'Tacos or Burritos?'
    }
  ]
  const pollsPromise = Promise.resolve(polls)
  return pollsPromise
}

export function getPoll(id) {
  const polls = [
    {
      id: '0',
      title: 'NBA or NHL?'
    },
    {
      id: '1',
      title: 'Apples or Oranges?'
    },
    {
      id: '2',
      title: 'Tacos or Burritos?'
    }
  ]
  const poll = polls.filter(p => p.id === id)
  return poll.length > 0 ? poll[0] : null;
}
