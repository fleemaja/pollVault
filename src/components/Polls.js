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
    const { category, searchQuery, sortType } = this.props
    this.props.getPolls(category, searchQuery, sortType)
  }

  componentWillReceiveProps = (nextProps) => {
    const totalPolls = nextProps.polls.length;
    if (totalPolls > 0) {
      this.setState({ noResults: false })
    } else {
      this.setState({ noResults: true })
    }
  }

  render() {
    const { noResults } = this.state;
    return (
      <section style={{width: this.props.contentWidth, paddingTop: 40}}>
        <Masonry
          options={masonryOptions}
          style={{margin: '0 auto'}}>
          { this.props.polls.map(p => <Poll poll={p} slugPoll={false} />) }
          {
            noResults &&
            <section style={{textAlign: 'center', color: '#555'}}>
              <p style={{fontSize: 72, margin: '40px 0'}}>¯\_(ツ)_/¯</p>
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
    getPolls: (category, searchQuery, sortType) => dispatch(fetchPolls(category, searchQuery, sortType))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Polls);
