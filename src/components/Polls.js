import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import Poll from './Poll';
import { fetchPolls } from '../actions/polls';
import { connect } from 'react-redux';

const masonryOptions = {
  isFitWidth: true,
  gutter: 40
}

class Polls extends Component {

  componentWillMount = () => {
    this.props.getPolls();
  }

  render() {
    const sortByKey = (sortKey) => (a, b) => a[sortKey] < b[sortKey];
    const category = this.props.category;
    const sortKey = this.props.sortKey;
    return (
      <section style={{width: this.props.contentWidth, paddingTop: 40, backgroundColor: '#fcfdfe'}}>
        <Masonry
          options={masonryOptions}
          style={{margin: '0 auto'}}>
          {
            this.props.polls
              .filter(p => category === 'all' || p.category === category)
              .sort(sortByKey(sortKey))
              .map(p => <Poll poll={p} />)
          }
        </Masonry>
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
