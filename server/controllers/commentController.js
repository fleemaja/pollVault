const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const User = mongoose.model('User');

exports.addComment = async (req, res) => {
  req.body.author = req.user._id;
  req.body.poll = req.params.id;
  const newComment = new Comment(req.body);
  await newComment.save();
  req.flash('success', 'Comment Saved!');
  res.redirect('back');
};

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
