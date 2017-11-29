import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { apiVoteReply } from '../actions/comments';
import Dialog from 'material-ui/Dialog';
import Like from 'material-ui/svg-icons/action/thumb-up';
import Dislike from 'material-ui/svg-icons/action/thumb-down';
import Moment from 'moment';
import AddReplyForm from './AddReplyForm';
import DeleteReplyConfirmation from './DeleteReplyConfirmation';
import { letterToHexColor } from '../helpers';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Cancel from 'material-ui/svg-icons/navigation/cancel';

class Reply extends Component {
  state = {
    deleteMenuOpen: false,
    anchorEl: null,
    deleteReplyModalOpen: false,
    displayReplyForm: false
  }

  handleDeleteModalOpen = () => {
    this.handleDeleteMenuClose();
    this.setState({ deleteReplyModalOpen: true });
  };

  handleDeleteModalClose = () => {
    this.setState({ deleteReplyModalOpen: false });
  };

  vote = (isUpvote) => {
    const reply = this.props.reply;
    const replyId = reply.id;
    this.props.vote(replyId, isUpvote);
  }

  displayReplyForm = () => {
    if (this.props.auth.isAuthenticated) {
      this.setState({ displayReplyForm: true })
    } else {
      this.props.handleCommentClick();
    }
  }

  hideReplyForm = () => {
    this.setState({ displayReplyForm: false })
  }

  handleDeleteMenuOpen = (e) => {
    this.setState({
      deleteMenuOpen: true,
      anchorEl: e.currentTarget,
    });
  };

  handleDeleteMenuClose = () =>
    this.setState({deleteMenuOpen: false});

  render() {
    const { reply, auth } = this.props;
    const { displayReplyForm } = this.state;
    const author = reply.author;
    const replyOwnerId = author && author.id;
    const votes = reply.votes;
    const currentUser = auth.user.id;
    const isOwnedByUser = replyOwnerId === currentUser;
    const voteScore = (votes.length > 0) ? votes.reduce((accumulator, currentVote) => {
      const voteVal = currentVote.isUpvote ? 1 : -1;
      return accumulator + voteVal;
    }, 0) : 0;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleDeleteModalClose}
      />
    ];
    let userVoted = false;
    let userVoteIsUpvote;
    if (auth.isAuthenticated) {
      const voteFilter = reply.votes.filter(v => v.author === auth.user.id);
      if (voteFilter.length > 0) {
        userVoted = true;
        userVoteIsUpvote = voteFilter[0].isUpvote;
      }
    }
    const time = Moment(`${reply.created}`).format("x");
    const timeAgo = Moment(time, "x").fromNow();
    const letter = author.username.charAt(0);
    return (
      <section>
        <section>
          <section style={{display: 'inline-block', verticalAlign: 'middle'}}>
            {
              author && (
                author.photo ?
                  <Avatar size={30} src={`../uploads/${author.photo}`} alt="" /> :
                  <Avatar size={30} style={{backgroundColor: letterToHexColor[letter.toLowerCase()] || '#ddd', color: '#333'}}>{ letter }</Avatar>
              )
            }
          </section>
          <section style={{display: 'inline-block', verticalAlign: 'middle'}}>
            <strong style={{margin: '0 10px'}} >{ author.username }</strong>
            <span>{ timeAgo }</span>
          </section>
        </section>
        <p>{ reply.text }</p>
        <strong>{ voteScore }</strong>
        <section style={{display: 'inline-block', verticalAlign: 'middle'}}>
          <IconButton
            tooltip="Like"
            iconStyle={{ opacity: userVoteIsUpvote ? 1 : 0.5 }}
            onClick={() => this.vote(true)} >
            <Like />
          </IconButton>
          <IconButton
            tooltip="Dislike"
            iconStyle={{ opacity: (userVoted && !userVoteIsUpvote) ? 1 : 0.5 }}
            onClick={() => this.vote(false)} >
            <Dislike />
          </IconButton>
        </section>
        <FlatButton
          title="Reply"
          label="Reply"
          onClick={this.displayReplyForm.bind(this)}
         />
        {
          displayReplyForm &&
          <AddReplyForm
            commentId={this.props.commentId}
            hideReplyForm={this.hideReplyForm.bind(this)} />
        }
        {
          isOwnedByUser &&
          <section style={{display: 'inline-block', verticalAlign: 'middle'}}>
            <IconButton
              tooltip="Delete Reply?"
              onClick={this.handleDeleteMenuOpen}>
              <Cancel />
            </IconButton>
            <Popover
              open={this.state.deleteMenuOpen}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleDeleteMenuClose}
            >
              <Menu>
                <MenuItem
                  onClick={this.handleDeleteModalOpen}
                  primaryText="Delete Reply?" />
              </Menu>
            </Popover>
            <Dialog
              title="Delete Reply?"
              actions={actions}
              modal={true}
              open={this.state.deleteReplyModalOpen}
            >
              <DeleteReplyConfirmation
                reply={reply}
                commentId={this.props.commentId}
                handleClose={this.handleDeleteModalClose.bind(this)} />
            </Dialog>
          </section>
        }
      </section>
    )
  }
}

function mapStateToProps ({ auth }) {
  return { auth }
}

function mapDispatchToProps(dispatch) {
  return {
    vote: (id, isUpvote) => dispatch(apiVoteReply(id, isUpvote))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reply);
