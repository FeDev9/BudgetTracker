const express = require('express');
const controller = require('../controllers/transactionsController');
const { route } = require('./pages');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/add-transaction', authController.isLoggedIn, controller.add);
router.get('/delete-transaction/:id', authController.isLoggedIn, controller.delete);
router.get('/all-transactions', authController.isLoggedIn, controller.allTransactions);
router.post('/filter', authController.isLoggedIn, controller.filter);


module.exports = router;