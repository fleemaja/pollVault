const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const voteSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: 'Vote must have ip address'
  },
  poll: {
    type: mongoose.Schema.ObjectId,
    ref: 'Poll',
    required: 'Vote must be a part of a poll.'
  },
  choice: {
    type: mongoose.Schema.ObjectId,
    ref: 'Choice',
    required: 'Vote must be for a poll choice.'
  }
});

// ensures that ip only gets one vote per poll
voteSchema.index(
  { ip: 1, poll: 1 },
  { unique: true }
);

module.exports = mongoose.model('Vote', voteSchema);
