const mongoose = require('mongoose');
const Poll = mongoose.model('Poll');
const Choice = mongoose.model('Choice');
const Vote = mongoose.model('Vote');

exports.addPoll = (req, res) => {
  res.render('editPoll', { title: 'Add Poll'} );
};

const createChoices = async (choices, pollId) => {
  await Promise.all(choices.map(async (choice) => {
    await (new Choice({
      text: choice,
      poll: pollId
    })).save();
  }));
};

exports.createPoll = async (req, res) => {
  req.body.author = req.user._id;
  const poll = await (new Poll(req.body)).save();
  // I don't think this is the best way to create poll choices...
  const choices = await createChoices(req.body.choices, poll._id);
  req.flash('success', `Successfully created poll: "${poll.title}"!`);
  res.redirect(`/poll/${poll.slug}`);
};

exports.getPolls = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 12;
  const skip = (page * limit) - limit;

  const pollsPromise = Poll
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ created: 'desc' });

  const countPromise = Poll.count();

  const [polls, count] = await Promise.all([pollsPromise, countPromise]);

  const pages = Math.ceil(count / limit);

  if (!polls.length && skip) {
    req.flash('info', `You asked for page ${page}. But that does not exist so I put you on page ${pages}`);
    res.redirect(`/polls/page/${pages}`);
    return;
  }

  res.render('polls', { title: 'Polls', polls, page, pages, count } )
};

const confirmOwner = (poll, user) => {
  if (!poll.author.equals(user._id)) {
    throw Error('You must own a poll in order to edit it!');
  }
};

exports.getPollsByCategory = async (req, res) => {
  const category = req.params.category;
  const categoryQuery = category || { $exists: true };

  const categoriesPromise = Poll.getCategoriesList();
  const pollsPromise = Poll.find({ category: categoryQuery });
  const [categories, polls] = await Promise.all([categoriesPromise, pollsPromise]);
  res.json(polls);
};

exports.editPoll = async (req, res) => {
  const poll = await Poll.findOne({ _id: req.params.id }).populate('choices');
  confirmOwner(poll, req.user);
  res.render('editPoll', { title: 'Edit Poll', poll });
};

exports.updatePoll = async (req, res) => {
  const poll = await Poll.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new poll instead of the old one
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated <strong>${poll.title}</strong> <a href="/poll/${poll.slug}">View Poll</a>`);
  res.redirect(`/polls/${poll._id}/edit`);
};

exports.makeVote = async (req, res) => {
  // create new vote (log user's ip, poll, and choice)
  const ip = req.ip;
  const poll = req.params.id;
  const choice = req.body.choiceId;
  const vote = { ip, poll, choice };
  await (new Vote(vote)).save();
  // increment choice's vote count
  const choiceObj = await Choice.findOne({ _id: choice });
  req.body.poll = poll;
  req.body.votes = choiceObj.votes + 1;
  const updatedChoice = await Choice.findOneAndUpdate({ _id: choice }, req.body, {
    new: true
  }).exec();
};

exports.getPollBySlug = async (req, res, next) => {
  const poll = await Poll.findOne({ slug: req.params.slug }).populate('author comments choices votes');
  if (!poll) return next();
  const ip = req.ip;
  const votes = poll.votes.filter((v) => v.ip === ip);
  const vote = votes.length > 0 ? votes[0] : {};
  res.render('poll', { title: poll.title, poll, vote });
};

exports.searchPolls = async (req, res) => {
  const polls = await Poll
  .find({
    $text: {
      $search: req.query.q
    }
  }, {
      score: { $meta: 'textScore' }
  })
  .sort({
    score: { $meta: 'textScore' }
  })
  .limit(10);
  res.json(polls);
};