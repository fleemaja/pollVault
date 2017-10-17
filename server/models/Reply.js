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
});

function autopopulate(next) {
  this.populate('author');
  next();
};

replySchema.pre('find', autopopulate);
replySchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Reply', replySchema);
