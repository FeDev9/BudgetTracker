const express = require('express');
const controller = require('../controllers/transactionsController');
const { route } = require('./pages');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/add-transaction', authController.isLoggedIn, controller.add);


module.exports = router;