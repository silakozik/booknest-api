const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/available', reportController.getAvailableCount);
router.get('/borrowed', reportController.getBorrowedCount);
router.get('/summary', reportController.getSummary);

module.exports = router;
