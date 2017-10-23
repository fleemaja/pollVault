import React, { Component } from 'react';

class Results extends Component {
  render() {
    const choices = this.props.choices
    const totalVotes = this.props.choices.reduce((accumulator, choice) => (
      accumulator + choice.votes
    ), 0);
    return (
      <section>
        {
          choices.map(c => {
            const percentOfVote = `${Math.round(c.votes/totalVotes * 100)}%`;
            return (
              <section style={{...style, width: percentOfVote}}>
                <span style={{marginLeft: 5}}>{ c.text } - { percentOfVote }</span>
              </section>
            )
          })
        }
      </section>
    )
  }
}

const style = {
  width: '50%',
  backgroundColor: '#ddd',
  borderRadius: '5px',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  padding: '5px 0',
  margin: '5px 0'
};

export default Results;
