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
    noResults: false,
    totalPolls: 0,
    currentRenderedPolls: 0
  }

  componentWillMount = () => {
    const { category, searchQuery, sortType } = this.props
    window.addEventListener('scroll', this.handleOnScroll);
    window.addEventListener('resize', this.updateRenderedPolls);
    this.props.getPolls(category, searchQuery, sortType);
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleOnScroll);
    window.removeEventListener('resize', this.updateRenderedPolls);
  }

  componentWillReceiveProps = (nextProps) => {
    const totalPolls = nextProps.polls.length;
    const clientWidth = document.documentElement.clientWidth || window.innerWidth;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const estimatedRows = clientHeight/320;
    const estimatedCols = clientWidth/320;
    const currentRenderedPolls = Math.round(estimatedRows * estimatedCols);
    if (totalPolls > 0) {
      this.setState({ noResults: false, totalPolls, currentRenderedPolls })
    } else {
      this.setState({ noResults: true, totalPolls, currentRenderedPolls: 0 })
    }
  }

  updateRenderedPolls = () => {
    const clientWidth = document.documentElement.clientWidth || window.innerWidth;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const estimatedRows = clientHeight/320;
    const estimatedCols = clientWidth/320;
    const estimatedRenderedPolls = Math.round(estimatedRows * estimatedCols);
    const { currentRenderedPolls } = this.state
    if (currentRenderedPolls < estimatedRenderedPolls) {
      this.setState({ currentRenderedPolls: estimatedRenderedPolls })
    }
  }

  handleOnScroll = () => {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      const { total, currentRenderedPolls } = this.state
      const potentialRenderedPolls = currentRenderedPolls + 12
      if (potentialRenderedPolls > total) {
        this.setState({ currentRenderedPolls: total })
      } else {
        this.setState({ currentRenderedPolls: potentialRenderedPolls })
      }
    }
  }

  render() {
    const { noResults, currentRenderedPolls } = this.state;
    return (
      <section style={{width: this.props.contentWidth, paddingTop: 40}}>
        <Masonry
          options={masonryOptions}
          style={{margin: '0 auto'}}>
          {
            this.props.polls.slice(0, currentRenderedPolls)
              .map(p => <Poll poll={p} />)
          }
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
