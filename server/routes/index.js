const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// AUTHENTICATION
router.post('/api/login', authController.login);
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
