const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.login = function(req, res, next) {
	// Do username and password validation for the server
	passport.authenticate("local", function(err, user, info) {

		if(err) {
			return res.json({ success: false, message: err })
		}
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
			const token = jwt.sign({
        id: user._id,
        username: user.username
      }, process.env.jwtSecret);
      res.json({ success: true, token });
		})
	})(req, res, next)
}

exports.logout = (req, res) => {
  req.logout()
	res.json({ success: true })
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) { // passport method
		next();
    return;
  }
  //req.flash('error', 'You must be logged in to do that!');
  res.json({'error': 'You must be logged in to do that!'});
};

exports.authenticate = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
				// find user with decoded user's id
				User.findById(decoded.id).then((user, err) => {
					if (!user) {
						res.status(404).json({ error: 'No such user' });
					} else {
						req.user = user;
						next();
					}
				})
      }
    });
  } else {
    res.status(403).json({
      error: 'No token provided'
    });
  }
}

exports.confirmedPasswords = (req, res, next) => {
  if (req.body.password === req.body['password-confirm']) {
    next();
    return;
  }
  // req.flash('error', 'Passwords do not match!');
  res.json({'error': 'Passwords do not match!'});
};
