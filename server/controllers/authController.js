const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.login = function(req, res, next) {
	// Do username and password validation for the server
	passport.authenticate("local", function(err, user, info) {

		if(err) return next(err)
		if(!user) {
			return res.json({ success: false, message: info.message })
		}
		// ***********************************************************************
		// "Note that when using a custom callback, it becomes the application's
		// responsibility to establish a session (by calling req.login()) and send
		// a response."
		// Source: http://passportjs.org/docs
		// ***********************************************************************
		// Passport exposes a login() function on req (also aliased as logIn())
		// that can be used to establish a login session
		req.logIn(user, loginErr => {
			if(loginErr) {
				return res.json({ success: false, message: loginErr })
			}
			return res.json({ success: true, message: "authentication succeeded" })
		})
	})(req, res, next)
}

exports.logout = (req, res) => {
  console.log("SEACREST OUTTTTTTTT")
  req.logout()
	return res.json({ success: true })
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
