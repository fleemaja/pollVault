const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const replyVoteSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'User must be logged in to vote.'
  },
  reply: {
    type: mongoose.Schema.ObjectId,
    ref: 'Reply',
    required: 'Vote must be for a comment.'
  },
  isUpvote: {
    type: Boolean,
    required: 'VoteType can be either true (upvote) or false (downvote).'
  }
});

// ensures that user only gets one vote per reply
replyVoteSchema.index(
  { author: 1, reply: 1 },
  { unique: true }
);

module.exports = mongoose.model('ReplyVote', replyVoteSchema);
