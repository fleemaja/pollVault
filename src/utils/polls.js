export function getPolls() {
  const polls = [
    {
      title: 'NBA or NHL?'
    },
    {
      title: 'Apples or Oranges?'
    },
    {
      title: 'Tacos or Burritos?'
    }
  ]
  const pollsPromise = Promise.resolve(polls)
  return pollsPromise
}
