const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const commentSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author!'
  },
  poll: {
    type: mongoose.Schema.ObjectId,
    ref: 'Poll',
    required: 'You must supply a poll!'
  },
  text: {
    type: String,
    required: 'Your comment must have text!',
    maxlength: 500
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// find comments where the poll _id property === comment poll property
commentSchema.virtual('replies', {
  ref: 'Reply', // what model to link
  localField: '_id', // which field on the poll
  foreignField: 'comment' // which field on the comment
});

commentSchema.virtual('votes', {
  ref: 'CommentVote', // what model to link
  localField: '_id', // which field on the poll
  foreignField: 'comment' // which field on the vote
});

function autopopulate(next) {
  this
    .populate('author replies votes')
    .populate({
       path: 'replies',
       populate: {
         path: 'votes',
         model: 'ReplyVote'
       }
    })
  next();
};

commentSchema.pre('find', autopopulate);
commentSchema.pre('findById', autopopulate);
commentSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Comment', commentSchema);
