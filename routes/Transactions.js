const express = require('express');
const controller = require('../controllers/transactionsController');
const { route } = require('./pages');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/add-transaction', authController.isLoggedIn, controller.add);
router.get('/delete-transaction/:id', authController.isLoggedIn, controller.delete);


module.exports = router;