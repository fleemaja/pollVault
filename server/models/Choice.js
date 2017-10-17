const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const choiceSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: 'Poll choice must have text'
  },
  votes: {
    type: Number,
    default: 0
  },
  poll: {
    type: mongoose.Schema.ObjectId,
    ref: 'Poll',
    required: 'Choice must be a part of a poll.'
  }
});

// Define our indices
choiceSchema.index({
  text: 'text'
});

module.exports = mongoose.model('Choice', choiceSchema);
