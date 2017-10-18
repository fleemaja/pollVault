const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const pollSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Please enter a poll title'
  },
  slug: String,
  category: String,
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author'
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Define our indices
pollSchema.index({
  title: 'text',
  category: 'text'
});

// TODO: need to sanitize all user inputs pre-save

pollSchema.pre('save', async function(next) {
  if (!this.isModified('title')) {
    next();
    return;
  }
  this.slug = slug(this.title);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const pollsWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (pollsWithSlug.length) {
    this.slug = `${this.slug}-${pollsWithSlug.length + 1}`;
  }
  next();
});

pollSchema.statics.getCategoriesList = function() {
  return this.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 }}},
    { $sort: { count: -1 }}
  ]);
};

// find comments where the poll _id property === comment poll property
pollSchema.virtual('comments', {
  ref: 'Comment', // what model to link
  localField: '_id', // which field on the poll
  foreignField: 'poll' // which field on the comment
});

pollSchema.virtual('choices', {
  ref: 'Choice', // what model to link
  localField: '_id', // which field on the poll
  foreignField: 'poll' // which field on the choice
});

pollSchema.virtual('votes', {
  ref: 'Vote', // what model to link
  localField: '_id', // which field on the poll
  foreignField: 'poll' // which field on the vote
});

function autopopulate(next) {
  this.populate('author comments choices votes');
  next();
};

pollSchema.pre('find', autopopulate);
pollSchema.pre('findById', autopopulate);

module.exports = mongoose.model('Poll', pollSchema);
