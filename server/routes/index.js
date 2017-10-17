const express = require('express');
const router = express.Router();

const pollController = require('../controllers/pollController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');
const replyController = require('../controllers/replyController');
const { catchErrors } = require('../handlers/errorHandlers');

// API
router.get('/api/polls', catchErrors(pollController.getPolls));
router.get('/polls/page/:page', catchErrors(pollController.getPolls));
//router.get('/api/add', authController.isLoggedIn, pollController.addPoll);
router.post('/api/add', authController.isLoggedIn, catchErrors(pollController.createPoll));
router.post('/add/:id', authController.isLoggedIn, catchErrors(pollController.updatePoll));
//router.get('/polls/:id/edit', catchErrors(pollController.editPoll));
//router.get('/poll/:slug', catchErrors(pollController.getPollBySlug));

router.post('/api/comments/:id', authController.isLoggedIn, catchErrors(commentController.addComment));
router.post('/api/replies/:id', authController.isLoggedIn, catchErrors(replyController.addReply));

router.get('/api/search', catchErrors(pollController.searchPolls));
router.post('/api/polls/:id/vote', catchErrors(pollController.makeVote));
router.post('/api/comments/:id/upvote', catchErrors(commentController.upvoteComment));
router.post('/api/replies/:id/upvote', catchErrors(replyController.upvoteReply));
router.get('/api/polls/:category', catchErrors(pollController.getPollsByCategory));

// AUTHENTICATION
router.post('/api/login',
  userController.validateLogin,
  authController.login
);
router.get('/api/logout', authController.logout);
router.post('/api/register',
  userController.validateRegister,
  userController.register,
  authController.login
);
router.post('/api/account',
  userController.upload,
  catchErrors(userController.resize),
  catchErrors(userController.updateAccount)
);

module.exports = router;
