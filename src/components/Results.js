import React, { Component } from 'react';
import CheckMark from 'material-ui/svg-icons/maps/beenhere';

class Results extends Component {
  state = {
    mounted: false
  }

  componentDidMount = () => {
    this.setState({ mounted: true })
  }

  render() {
    const ipVote = this.props.ipVote
    const choices = this.props.choices
    const totalVotes = choices.reduce((accumulator, choice) => (
      accumulator + choice.votes
    ), 0);
    const { mounted } = this.state
    return (
      <section>
        {
          choices.map(c => {
            const isUserVote = ipVote === c.id;
            const backgroundColor = isUserVote ? '#cdebf9' : '#ddd';
            const percentOfVote = Math.round(c.votes/totalVotes * 100);
            return (
              <section
                style={{
                  ...style,
                  backgroundColor,
                  backgroundSize: '200% 100%',
                  backgroundImage: `linear-gradient(to right, white 50%, ${backgroundColor} 50%)`,
                  transition: 'background-position 1s ease',
                  backgroundPosition: `${mounted ? `${-percentOfVote}% 0` : '0 0'}`
                }}>
                {
                  isUserVote &&
                  <CheckMark
                    style={{verticalAlign: 'middle', display: 'inline-block'}} />
                 }
                <span style={{marginLeft: 5}}>{ c.text } - { `${percentOfVote}%` }</span>
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
  padding: '5px 0',
  margin: '5px 0'
};

export default Results;
