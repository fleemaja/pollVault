const polls = [
  {
    id: '0',
    title: 'NBA or NHL?',
    timestamp: 0,
    category: 'sports',
    votes: 5,
    options: [
      {
        text: "NBA",
        votes: 3
      },
      {
        text: "NHL",
        votes: 2
      }
    ]
  },
  {
    id: '1',
    title: 'Apples or Oranges?',
    timestamp: 1,
    category: 'food',
    votes: 22,
    options: [
      {
        text: "Apples",
        votes: 7
      },
      {
        text: "Oranges",
        votes: 15
      }
    ]
  },
  {
    id: '2',
    title: 'Tacos or Burritos?',
    timestamp: 2,
    category: 'food',
    votes: 19,
    options: [
      {
        text: "Tacos",
        votes: 12
      },
      {
        text: "Burritos",
        votes: 7
      }
    ]
  }
]

export function getPolls() {
  const pollsPromise = Promise.resolve(polls)
  return pollsPromise
}

export function getPoll(id) {
  // Only these show pages will work for now since they are hardcoded
  const poll = polls.filter(p => p.id === id)
  return poll.length > 0 ? poll[0] : null;
}

export function addPoll(poll) {
  const id = Math.random() * (2**64);
  const p = {
    id,
    title: poll.title,
    votes: 0,
    timestamp: 3
  }
  return Promise.resolve(p)
}
