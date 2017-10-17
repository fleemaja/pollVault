const api = 'http://localhost:5001';

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

export const addPoll = (poll) => {
  alert(JSON.stringify(poll))
  fetch(`${api}/api/add`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: poll.title,
      category: poll.category,
      choices: poll.choices
    })
  }).then(res => res.json())
    .then(data => data)
}
