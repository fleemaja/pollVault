import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { getPollBySlug } from '../utils/polls';
import { setComments } from '../actions/comments';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import Comments from './Comments';
import AddCommentForm from './AddCommentForm';
import AppBar from 'material-ui/AppBar';
import Poll from './Poll'

class Show extends Component {
  state = {
    poll: {},
    slug: ''
  }

  componentWillMount() {
    const slug = this.props.match.params.slug;
    this.setState({ slug });
    getPollBySlug(slug)
      .then(response => {
        const poll = response.data.poll;
        if (poll) {
          this.setState({ poll })
          this.props.setComments(poll.comments);
        }
      })
  }

  render() {
    const { poll } = this.state
    const comments = this.props.comments
    return (
      <MuiThemeProvider>
        <AppBar
          style={{backgroundColor: '#fff'}}
          titleStyle={{color: '#333'}}
          title="PollVault"
          showMenuIconButton={false}
        />
        <section>
          <Poll poll={poll} />
          <AddCommentForm parentId={poll.id}/>
          <Comments comments={comments} />
        </section>
      </MuiThemeProvider>
    )
  }
}

const style = {
  width: 600,
  margin: 20,
  padding: 20,
  textAlign: 'center',
  display: 'inline-block'
};

function mapStateToProps ({ comments }) {
  return { comments }
}

function mapDispatchToProps(dispatch) {
  return {
    setComments: (comments) => dispatch(setComments(comments))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Show);
