import React, { Component } from 'react';
import CheckMark from 'material-ui/svg-icons/maps/beenhere';

class Results extends Component {
  render() {
    const ipVote = this.props.ipVote
    const choices = this.props.choices
    const totalVotes = choices.reduce((accumulator, choice) => (
      accumulator + choice.votes
    ), 0);
    return (
      <section>
        {
          choices.map(c => {
            const isUserVote = ipVote === c.id;
            const backgroundColor = isUserVote ? '#cdebf9' : '#ddd';
            const percentOfVote = `${Math.round(c.votes/totalVotes * 100)}%`;
            return (
              <section style={{...style, width: percentOfVote, backgroundColor }}>
                {
                  isUserVote &&
                  <CheckMark
                    style={{verticalAlign: 'middle', display: 'inline-block'}} />
                 }
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
  borderRadius: '5px',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  padding: '5px 0',
  margin: '5px 0'
};

export default Results;
