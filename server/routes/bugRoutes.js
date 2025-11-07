const express = require('express');
const router = express.Router();
const { getBugs, reportBug, updateBug, deleteBug, } = require('../controllers/bugController');

// Chain routes for better organization
router.route('/').get(getBugs).post(reportBug);
router.route('/:id').put(updateBug).delete(deleteBug);

module.exports = router;