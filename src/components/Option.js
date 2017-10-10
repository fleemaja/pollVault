import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Option extends Component {
  render() {
    const option = this.props.option
    return (
      <section>
        <RaisedButton
          onClick={this.props.vote.bind(this)}
          label={`${ option.text } - ${ option.votes }`}
        />
      </section>
    )
  }
}

export default Option
