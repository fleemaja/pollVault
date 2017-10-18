const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const User = mongoose.model('User');

exports.addComment = async (req, res) => {
  req.body.author = req.user._id;
  req.body.poll = req.params.id;
  const newComment = new Comment(req.body);
  await newComment.save();
  const populatedComment =
    await Comment.findById(newComment._id)
                 .populate('author replies');
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

exports.upvoteComment = async (req, res) => {
  const upvotes = req.user.upvotes.map(obj => obj.toString());
  const operator = upvotes.includes(req.params.id) ? '$pull' : '$addToSet';
  const user = await User
    .findByIdAndUpdate(req.user._id,
    { [operator]: { upvotes: req.params.id }},
    { new: true }
  );
  res.json(upvotes);
};
