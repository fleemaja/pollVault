import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { apiVoteComment } from '../actions/comments';
import Dialog from 'material-ui/Dialog';
import DeleteCommentConfirmation from './DeleteCommentConfirmation';
import Like from 'material-ui/svg-icons/action/thumb-up';
import Dislike from 'material-ui/svg-icons/action/thumb-down';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Moment from 'moment';
import AddReplyForm from './AddReplyForm';
import Replies from './Replies';
import { letterToHexColor } from '../helpers';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Cancel from 'material-ui/svg-icons/navigation/cancel';

class Comment extends Component {

  state = {
    deleteMenuOpen: false,
    anchorEl: null,
    deleteCommentModalOpen: false,
    displayReplyForm: false
  }

  handleDeleteModalOpen = () => {
    this.handleDeleteMenuClose();
    this.setState({deleteCommentModalOpen: true});
  };

  handleDeleteModalClose = () => {
    this.setState({deleteCommentModalOpen: false});
  };

  vote = (isUpvote) => {
    const comment = this.props.comment;
    const commentId = comment.id;
    this.props.vote(commentId, isUpvote);
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
    const { comment, auth } = this.props;
    const { displayReplyForm } = this.state;
    const author = comment.author;
    const commentOwnerId = author && author.id;
    const currentUser = auth.user.id;
    const isOwnedByUser = commentOwnerId === currentUser;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleDeleteModalClose}
      />
    ];
    const voteScore = comment.votes.reduce((accumulator, currentVote) => {
      const voteVal = currentVote.isUpvote ? 1 : -1;
      return accumulator + voteVal;
    }, 0);
    let userVoted = false;
    let userVoteIsUpvote;
    if (auth.isAuthenticated) {
      const voteFilter = comment.votes.filter(v => v.author === auth.user.id);
      if (voteFilter.length > 0) {
        userVoted = true;
        userVoteIsUpvote = voteFilter[0].isUpvote;
      }
    }
    const time = Moment(`${comment.created}`).format("x");
    const timeAgo = Moment(time, "x").fromNow();
    const letter = author.username.charAt(0);
    return (
      <section style={{textAlign: 'left', marginBottom: 20}}>
        <section>
          <section style={{display: 'inline-block', verticalAlign: 'middle'}}>
            {
              author && (
                author.photo ?
                  <Avatar src={`../uploads/${author.photo}`} alt="" /> :
                  <Avatar style={{backgroundColor: letterToHexColor[letter.toLowerCase()] || '#ddd', color: '#333'}}>{ letter }</Avatar>
              )
            }
          </section>
          <section style={{display: 'inline-block', verticalAlign: 'middle'}}>
            <strong style={{marginLeft: 10}}>{ comment.author.username }</strong>
            <span style={{marginLeft: 10}}>{ timeAgo }</span>
          </section>
        </section>
        <p>{ comment.text }</p>
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
          isOwnedByUser &&
          <section style={{display: 'inline-block', verticalAlign: 'middle'}}>
            <IconButton
              tooltip="Delete Comment?"
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
                  primaryText="Delete Comment?" />
              </Menu>
            </Popover>
            <Dialog
              title="Delete Comment?"
              actions={actions}
              modal={true}
              open={this.state.deleteCommentModalOpen}
            >
              <DeleteCommentConfirmation
                comment={comment}
                handleClose={this.handleDeleteModalClose.bind(this)} />
            </Dialog>
          </section>
        }
        {
          displayReplyForm &&
          <AddReplyForm
            commentId={comment.id}
            hideReplyForm={this.hideReplyForm.bind(this)} />
        }
        <Replies
          handleCommentClick={this.props.handleCommentClick}
          replies={comment.replies}
          commentId={comment.id}
        />
      </section>
    )
  }
}

function mapStateToProps ({ auth }) {
  return { auth }
}

function mapDispatchToProps(dispatch) {
  return {
    vote: (id, isUpvote) => dispatch(apiVoteComment(id, isUpvote))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
