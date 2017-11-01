import React, { Component } from 'react';
import { getPollBySlug } from '../utils/polls';
import { setComments } from '../actions/comments';
import { addFlashMessage } from '../actions/flashMessages';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import Comments from './Comments';
import AddCommentForm from './AddCommentForm';
import AppBar from 'material-ui/AppBar';
import Poll from './Poll';
import AppTitle from './AppTitle';
import FlashMessagesList from './FlashMessagesList';

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
      .catch(error => {
        if (error.response) {
          this.props.history.push('/404');
        } else {
          const msg = { type: "error", text: "Network Error. Check your internet connection" };
          this.props.addFlashMessage(msg)
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
          title={<AppTitle />}
          showMenuIconButton={false}
        />
        <FlashMessagesList />
        <section>
          <Poll poll={poll} />
          <AddCommentForm parentId={poll.id}/>
          <Comments comments={comments} />
        </section>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps ({ comments }) {
  return { comments }
}

function mapDispatchToProps(dispatch) {
  return {
    setComments: (comments) => dispatch(setComments(comments)),
    addFlashMessage: (msg) => dispatch(addFlashMessage(msg))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Show);
