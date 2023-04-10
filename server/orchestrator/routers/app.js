const express = require('express');
const router = express.Router();

const {
  findAllPosts,
  createPost,
  findPostBySlug,
  deletePostBySlug,
  updatePostBySlug,
} = require('../controllers/app');

router.get('/posts', findAllPosts);
router.post('/posts', createPost);
router.get('/posts/:slug', findPostBySlug);
router.put('/posts/:slug', updatePostBySlug);
router.delete('/posts/:slug', deletePostBySlug);

module.exports = router;
