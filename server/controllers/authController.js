const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.login = passport.authenticate('local', {
  failureFlash: 'Failed Login!',
  successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
  req.logout(); // passport method
  // req.flash('success', 'You are now logged out!');
  res.json({ 'success': 'You are now logged out!' });
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) { // passport method
    next();
    return;
  }
  //req.flash('error', 'You must be logged in to do that!');
  res.json({'error': 'You must be logged in to do that!'});
};

exports.confirmedPasswords = (req, res, next) => {
  if (req.body.password === req.body['password-confirm']) {
    next();
    return;
  }
  // req.flash('error', 'Passwords do not match!');
  res.json({'error': 'Passwords do not match!'});
};
