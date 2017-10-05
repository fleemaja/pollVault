import React, { Component } from 'react';
import Poll from './Poll';
import { fetchPolls } from '../actions/polls';
import { connect } from 'react-redux';

class Polls extends Component {
  componentWillMount = () => {
    this.props.getPolls();
  }
  render() {
    const sortByKey = (sortKey) => (a, b) => a[sortKey] < b[sortKey];
    const category = this.props.category;
    const sortKey = this.props.sortKey;
    return (
      <section style={{width: this.props.contentWidth, textAlign: 'center'}}>
        {
          this.props.polls
            .filter(p => category === 'all' || p.category === category)
            .sort(sortByKey(sortKey))
            .map(p => <Poll poll={p} />)
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
