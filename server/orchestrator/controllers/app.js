const axios = require('axios');
const appUrl = 'http://localhost:4001';
const serviceUrl = 'http://localhost:4002';
const Redis = require('ioredis');
const redis = new Redis({
  host: '127.0.0.1',
  port: '6379',
});

module.exports = {
  findAllPosts: async (req, res, next) => {
    const postCache = await redis.get('posts:get');
    if (postCache) {
      const postResult = JSON.parse(postCache);
      return res.status(200).json(postResult);
    }
    const { data: response } = await axios({
      method: 'GET',
      url: `${appUrl}/posts`,
    });
    await redis.set(
      'posts:get',
      JSON.stringify({
        statusCode: 200,
        message: `Success fetch post from orchestrator`,
        data: response,
      })
    );
    res.status(200).json({
      statusCode: 200,
      message: `Success fetch post from orchestrator`,
      data: response,
    });
    try {
    } catch (error) {
      console.log(error);
    }
  },
  createPost: async (req, res, next) => {
    try {
      const { title, content, imgUrl, CategoryId, nameTag } = req.body;
      const { data } = await axios({
        method: 'POST',
        url: `${appUrl}/posts`,
        data: {
          title,
          content,
          imgUrl,
          CategoryId,
          nameTag,
          // MongoId: '63f836809cf083c9c41fe2ba',
        },
      });
      const keys = redis.keys('posts:*');
      if (keys.length) {
        await redis.del(keys);
      }
      res.status(201).json({
        message: `Success create post from postgres`,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  findPostBySlug: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const { data: post } = await axios({
        method: 'GET',
        url: `${appUrl}/posts/${slug}`,
      });
      const { data: user } = await axios({
        method: 'GET',
        url: `${serviceUrl}/users/${post.post.MongoId}`,
      });
      post.User = user;
      await redis.setex('posts:post-by-id', 3, JSON.stringify(post));
      res.status(200).json({
        statusCode: 200,
        message: `Success get detail from service app`,
        data: post,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updatePostBySlug: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const { title, content, imgUrl, CategoryId, nameTag } = req.body;
      const { data: updatePostBySLug } = await axios({
        method: 'PUT',
        url: `${appUrl}/posts/${slug}`,
        data: {
          title,
          content,
          imgUrl,
          CategoryId,
          nameTag,
        },
      });
      const keys = await redis.keys('posts:*');
      if (keys.length) {
        await redis.del(keys);
      }
      res.status(201).json({
        message: `Success update post form postgres`,
        data: updatePostBySLug,
      });
    } catch (error) {
      console.log(error);
    }
  },
  deletePostBySlug: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const { data: findPostBySlug } = await axios({
        method: 'GET',
        url: `${appUrl}/posts/${slug}`,
      });
      if (!findPostBySlug) {
        throw new Error();
      }
      await axios({
        method: 'DELETE',
        url: `${appUrl}/posts/${slug}`,
      });
      const keys = await redis.keys('posts:*');
      if (keys.length) {
        await redis.del(keys);
      }
      res.status(200).json({
        message: `Success delete post with title: ${findPostBySlug.post.title}`,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
