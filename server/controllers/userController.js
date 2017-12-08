const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype is not allowed' }, false);
    }
  }
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  if (!req.file) {
    req.body.photo = req.user.photo;
    next();
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(40, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  next();
};

exports.validateRegister = async (req, res, next) => {
  req.sanitizeBody('username');
  req.checkBody('username', 'You must supply a username').notEmpty();
  const userWithUsername = await User.findOne({ username: req.body.username });
  req.checkBody('email', 'That email is not valid').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  const userWithEmail = await User.findOne({ email: req.body.email });
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
  req.checkBody('password', 'Your password must be at least 6 characters.').isLength({ min: 6 });
  req.checkBody('password-confirm', 'Confirmed Password cannot be Blank!').notEmpty();
  req.checkBody('password-confirm', 'Oops! Your passwords do not match!').equals(req.body.password);
  let errors = req.validationErrors() || [];
  if (userWithUsername) {
    const error = { location: 'body', param: 'username', msg: 'This username is already registered', value: req.body.username }
    errors.push(error)
  }
  if (userWithEmail) {
    const error = { location: 'body', param: 'email', msg: 'This email is already registered', value: req.body.email }
    errors.push(error)
  }
  if (errors.length > 0) {
    let formattedErrors = {};
    errors.forEach(e => {
      formattedErrors[e.param] = e.msg;
    })
    // req.flash('error', errors.map(err => err.msg));
    res.status(400).json(formattedErrors)
    return;
  }
  next();
};

exports.validateLogin = (req, res, next) => {
  req.sanitizeBody('username');
  req.checkBody('username', 'You must supply a username').notEmpty();
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    // req.flash('error', errors.map(err => err.msg));
    res.status(400).json({ success: false, message: errors.join("") })
    return;
  }
  next();
}

exports.register = async (req, res, next) => {
  const user = new User({ username: req.body.username, email: req.body.email });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next();
};

exports.updateAccount = async (req, res) => {
  const updates = {
    photo: req.body.photo
  };
  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updates },
    { new: true, runValidators: true, context: 'query' }
  );
  // req.flash('success', 'Updated the profile!');
  res.json({ user })
};

exports.getPhoto = async (req, res) => {
  const user = await User.findById(req.user._id);
  const photo = user.photo;
  res.json({ photo })
}

exports.findUser = async (req, res) => {
  let user;
  if (req.query.email) {
    user = await User.findOne({ email: req.query.email })
  } else if (req.query.username) {
    user = await User.findOne({ username: req.query.username })
  }
  res.json({ user })
}
