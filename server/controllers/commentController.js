const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const CommentVote = mongoose.model('CommentVote');

exports.addComment = async (req, res) => {
  req.body.author = req.user._id;
  req.body.poll = req.params.id;
  const newComment = new Comment(req.body);
  await newComment.save();
  const populatedComment =
    await Comment.findById(newComment._id)
                 .populate('author replies votes');
  res.json({ comment: populatedComment });
  // req.flash('success', 'Comment Saved!');
  // res.redirect('back');
};

const confirmOwner = (comment, user) => {
  if (!comment.author.equals(user._id)) {
    throw Error('You must own a comment in order to do that!');
  }
};

exports.deleteComment = async (req, res) => {
  const comment = await Comment.findById({ _id: req.params.id }).populate('author');
  confirmOwner(comment, req.user);
  await Comment.findByIdAndRemove(req.params.id)
}

exports.voteComment = async (req, res) => {
  const commentId = req.params.id;
  req.body.author = req.user._id;
  req.body.comment = commentId;
  const newVoteIsUpvote = req.body.isUpvote;
  let userHasAlreadyVotedBefore = false, oldVote, oldVoteSameAsNew;
  const comment = await Comment.findById({ _id: commentId }).populate('votes');
  comment.votes.forEach(v => {
    if (String(v.author) === String(req.user._id)) {
      userHasAlreadyVotedBefore = true;
      oldVote = v;
      oldVoteSameAsNew = newVoteIsUpvote === v.isUpvote
    }
  })
  if (oldVoteSameAsNew) {
    res.json({ userHasAlreadyVotedBefore, commentId, newCommentVote: oldVote })
  } else {
    if (userHasAlreadyVotedBefore) {
        await CommentVote.findByIdAndRemove(oldVote.id)
    }
    const newCommentVote = new CommentVote(req.body);
    await newCommentVote.save();
    res.json({ userHasAlreadyVotedBefore, commentId, newCommentVote })
  }
};
