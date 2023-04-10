const express = require('express');
const { tagController } = require('../controllers/tagController');
const router = express.Router();

router.get('/tags/:postId', tagController.getTags);

module.exports = router;
