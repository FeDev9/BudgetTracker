const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const controller = require('../controllers/pagesController');
const transactionsController = require('../controllers/transactionsController');

router.get('/', authController.isLoggedIn, controller.home);
router.get('/login', controller.login);
router.get('/register', controller.register);
router.get('/profile', authController.isLoggedIn, transactionsController.profile);


module.exports = router;