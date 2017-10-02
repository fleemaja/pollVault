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
      <section>
        {
          this.props.polls.map(p => <Poll title={p.title} />)
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
