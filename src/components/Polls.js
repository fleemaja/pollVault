import React, { Component } from 'react';
import Poll from './Poll';
import { fetchPolls } from '../actions/polls';
import { connect } from 'react-redux';

class Polls extends Component {
  componentWillMount = () => {
    this.props.getPolls();
  }
  render() {
    return (
      <section style={{width: this.props.contentWidth, textAlign: 'center'}}>
        {
          this.props.polls.map(p => <Poll poll={p} />)
        }
      </section>
    )
  }
}

function mapStateToProps ({ polls }) {
  return { polls }
}

function mapDispatchToProps(dispatch) {
  return {
    getPolls: () => dispatch(fetchPolls())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Polls);
