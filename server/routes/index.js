const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const errorHandlers = require('../handlers/errorHandlers');

function logBody(req, res, next) {
  console.log(req.body)
  next()
}

// AUTHENTICATION
router.post('/api/login', authController.login);
router.get('/api/logout', authController.logout);
router.post('/api/register',
  logBody,
  userController.validateRegister,
  userController.register,
  authController.login
);
router.post('/api/account',
  userController.upload,
  errorHandlers.catchErrors(userController.resize),
  errorHandlers.catchErrors(userController.updateAccount)
);

module.exports = router;
