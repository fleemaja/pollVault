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
import CircularProgress from 'material-ui/CircularProgress';
import Signup from './Signup';
import Login from './Login';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class Show extends Component {
  state = {
    poll: {},
    slug: '',
    isLoading: true,
    signupModalOpen: false,
    loginModalOpen: false
  }

  componentWillMount() {
    const slug = this.props.match.params.slug;
    this.setState({ slug });
    getPollBySlug(slug)
      .then(response => {
        const poll = response.data.poll;
        if (poll) {
          this.setState({ poll, isLoading: false })
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

  handleFormClick = () => {
    if (!this.props.auth.isAuthenticated) {
      this.handleSignupOpen();
    }
  }

  handleSignupOpen = () =>
    this.setState({signupModalOpen: true});

  handleSignupClose = () =>
    this.setState({signupModalOpen: false});

  handleLoginOpen = () =>
    this.setState({loginModalOpen: true});

  handleLoginClose = () =>
    this.setState({loginModalOpen: false});

  render() {
    const { poll, isLoading } = this.state
    const comments = this.props.comments
    const signupActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleSignupClose}
      />
    ];
    const loginActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleLoginClose}
      />
    ];
    return (
      <MuiThemeProvider>
        <AppBar
          style={{backgroundColor: '#fff'}}
          titleStyle={{color: '#333'}}
          title={<AppTitle />}
          showMenuIconButton={false}
        />
        <FlashMessagesList />
        {
          isLoading
          ? <CircularProgress
              size={180}
              thickness={15}
              style={{left: 'calc(50% - 90px)', top: 'calc(50% - 26px)', position: 'absolute'}} />
          : <section>
              <Poll poll={poll} />
              <AddCommentForm
                handleCommentClick={this.handleFormClick.bind(this)}
                parentId={poll.id} />
              <Comments
                handleCommentClick={this.handleFormClick.bind(this)}
                comments={comments} />
            </section>
        }
        <Dialog
          title="Signup to add polls and comments"
          actions={signupActions}
          autoScrollBodyContent={true}
          modal={true}
          open={this.state.signupModalOpen}
        >
          <Signup handleClose={this.handleSignupClose.bind(this)}/>
        </Dialog>
        <Dialog
          title="Login"
          actions={loginActions}
          autoScrollBodyContent={true}
          modal={true}
          open={this.state.loginModalOpen}
        >
          <Login handleClose={this.handleLoginClose.bind(this)}/>
        </Dialog>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps ({ auth, comments }) {
  return { auth, comments }
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
