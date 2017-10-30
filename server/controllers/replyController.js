const mongoose = require('mongoose');
const Reply = mongoose.model('Reply');
const ReplyVote = mongoose.model('ReplyVote');

exports.addReply = async (req, res) => {
  req.body.author = req.user._id;
  req.body.comment = req.params.id;
  const newReply = new Reply(req.body);
  await newReply.save();
  const populatedReply = await Reply.findById(newReply._id)
                                    .populate('author votes');
  res.json({ reply: populatedReply });
  // req.flash('success', 'Reply Saved!');
  // res.redirect('back');
};

const confirmOwner = (reply, user) => {
  if (!reply.author.equals(user._id)) {
    throw Error('You must own a reply in order to do that!');
  }
};

exports.deleteReply = async (req, res) => {
  const reply = await Reply.findById({ _id: req.params.id }).populate('author');
  confirmOwner(reply, req.user);
  await Reply.findByIdAndRemove(req.params.id)
}

exports.voteReply = async (req, res) => {
  const replyId = req.params.id;
  req.body.author = req.user._id;
  req.body.reply = replyId;
  const newVoteIsUpvote = req.body.isUpvote;
  let userHasAlreadyVotedBefore = false, oldVote, oldVoteSameAsNew;
  const reply = await Reply.findById({ _id: replyId }).populate('votes');
  const commentId = reply.comment;
  reply.votes.forEach(v => {
    if (String(v.author) === String(req.user._id)) {
      userHasAlreadyVotedBefore = true;
      oldVote = v;
      oldVoteSameAsNew = newVoteIsUpvote === v.isUpvote
    }
  })
  if (oldVoteSameAsNew) {
    res.json({ commentId, userHasAlreadyVotedBefore, replyId, newReplyVote: oldVote })
  } else {
    if (userHasAlreadyVotedBefore) {
        await ReplyVote.findByIdAndRemove(oldVote.id)
    }
    const newReplyVote = new ReplyVote(req.body);
    await newReplyVote.save();
    res.json({ commentId, userHasAlreadyVotedBefore, replyId, newReplyVote })
  }
};
