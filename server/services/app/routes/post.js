const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router.get('/posts', postController.getPosts);
router.post('/posts', postController.postPost);
router.get('/posts/:slug', postController.getPostBySlug);
router.put('/posts/:slug', postController.putPostBySlug);
router.delete('/posts/:slug', postController.deletePostBySlug);

module.exports = router;
