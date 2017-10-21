const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const User = mongoose.model('User');
const CommentVote = mongoose.model('CommentVote');

exports.addComment = async (req, res) => {
  req.body.author = req.user._id;
  req.body.poll = req.params.id;
  const newComment = new Comment(req.body);
  await newComment.save();
  const populatedComment =
    await Comment.findById(newComment._id)
                 .populate('author replies votes');
  res.json({ comment: populatedComment })
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
  req.body.author = req.user._id;
  req.body.comment = req.params.id;
  const newCommentVote = new CommentVote(req.body);
  await newCommentVote.save();
  const commentId = req.params.id;
  res.json({ commentId, newCommentVote })
};
