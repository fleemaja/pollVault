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
  // Only these show pages will work for now since they are hardcoded
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

export function addPoll(poll) {
  const id = Math.random() * (2**64);
  const p = {
    id,
    title: poll.title
  }
  return Promise.resolve(p)
}
