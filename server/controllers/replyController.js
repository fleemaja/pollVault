const mongoose = require('mongoose');
const Reply = mongoose.model('Reply');
const User = mongoose.model('User');

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

exports.upvoteReply = async (req, res) => {
  const upvotes = req.user.upvotes.map(obj => obj.toString());
  const operator = upvotes.includes(req.params.id) ? '$pull' : '$addToSet';
  const user = await User
    .findByIdAndUpdate(req.user._id,
    { [operator]: { upvotes: req.params.id }},
    { new: true }
  );
  res.json(upvotes);
};
