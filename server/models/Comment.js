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
    required: 'Your comment must have text!'
  },
  votes: {
    type: Number,
    default: 0
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

function autopopulate(next) {
  this.populate('author replies');
  next();
};

commentSchema.pre('find', autopopulate);
commentSchema.pre('findById', autopopulate);
commentSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Comment', commentSchema);
