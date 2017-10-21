const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const commentVoteSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'User must be logged in to vote.'
  },
  comment: {
    type: mongoose.Schema.ObjectId,
    ref: 'Comment',
    required: 'Vote must be for a comment.'
  },
  isUpvote: {
    type: Boolean,
    required: 'VoteType can be either true (upvote) or false (downvote).'
  }
});

// ensures that user only gets one vote per comment
commentVoteSchema.index(
  { author: 1, comment: 1 },
  { unique: true }
);

module.exports = mongoose.model('CommentVote', commentVoteSchema);
