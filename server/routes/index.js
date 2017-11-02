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
router.get('/api/polls/page/:page', catchErrors(pollController.getPolls));
//router.get('/api/add', authController.authenticate, pollController.addPoll);
router.post('/api/add', authController.authenticate, catchErrors(pollController.createPoll));
router.post('/api/add/:id', authController.authenticate, catchErrors(pollController.updatePoll));
//router.get('/polls/:id/edit', catchErrors(pollController.editPoll));
router.get('/api/poll/:slug', catchErrors(pollController.getPollBySlug));

router.post('/api/comments/:id', authController.authenticate, catchErrors(commentController.addComment));
router.delete('/api/comments/comment/:id', authController.authenticate, catchErrors(commentController.deleteComment));
router.post('/api/replies/:id', authController.authenticate, catchErrors(replyController.addReply));
router.delete('/api/replies/reply/:id', authController.authenticate, catchErrors(replyController.deleteReply));

router.get('/api/search', catchErrors(pollController.searchPolls));
router.delete('/api/polls/:id',
  authController.authenticate,
  catchErrors(pollController.deletePoll)
);
router.post('/api/polls/:id/vote', catchErrors(pollController.makeVote));
router.post('/api/comments/:id/vote', authController.authenticate, catchErrors(commentController.voteComment));
router.post('/api/replies/:id/vote', authController.authenticate, catchErrors(replyController.voteReply));
router.get('/api/polls/:category', catchErrors(pollController.getPollsByCategory));

router.get('/api/users', catchErrors(userController.findUser));

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
  authController.authenticate,
  userController.upload,
  catchErrors(userController.resize),
  catchErrors(userController.updateAccount)
);

router.get('/api/account/photo',
  authController.authenticate,
  catchErrors(userController.getPhoto)
);

module.exports = router;
