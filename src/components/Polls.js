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

  state = {
    noResults: false
  }

  componentWillMount = () => {
    this.props.getPolls();
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.polls.length > 0) {
      this.setState({ noResults: false })
    } else {
      this.setState({ noResults: true })
    }
  }

  render() {
    const sortByKey = (sortKey) => (a, b) => a[sortKey] < b[sortKey];
    const category = this.props.category;
    const sortKey = this.props.sortKey;
    const { noResults } = this.state;
    return (
      <section style={{width: this.props.contentWidth, paddingTop: 40}}>
        <Masonry
          options={masonryOptions}
          style={{margin: '0 auto'}}>
          {
            this.props.polls
              .filter(p => category === 'all' || p.category === category)
              .sort(sortByKey(sortKey))
              .map(p => <Poll poll={p} />)
          }
          {
            noResults &&
            <section style={{textAlign: 'center', color: '#555'}}>
              <p style={{fontSize: 72, margin: 40}}>¯\_(ツ)_/¯</p>
              <p>No results found!</p>
            </section>
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
