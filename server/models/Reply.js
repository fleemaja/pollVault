const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const replySchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author!'
  },
  comment: {
    type: mongoose.Schema.ObjectId,
    ref: 'Comment',
    required: 'You must supply a parent comment!'
  },
  text: {
    type: String,
    required: 'Your reply must have text!'
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

replySchema.virtual('votes', {
  ref: 'ReplyVote', // what model to link
  localField: '_id', // which field on the poll
  foreignField: 'reply' // which field on the vote
});

function autopopulate(next) {
  this.populate('author votes');
  next();
};

replySchema.pre('find', autopopulate);
replySchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Reply', replySchema);
