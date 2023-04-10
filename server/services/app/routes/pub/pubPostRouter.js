const express = require('express');
const pubPostController = require('../../controllers/pub/pubPostController');
const router = express.Router();

router.get('/pub/posts', pubPostController.getPosts);
router.get('/pub/posts/:slug', pubPostController.getPostBySlug);

module.exports = router;
