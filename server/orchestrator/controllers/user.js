const axios = require('axios');
const serviceUrl = 'http://localhost:4002';
const Redis = require('ioredis');
const redis = new Redis({
  host: '127.0.0.1',
  port: '6379',
});

module.exports = {
  findAllUsers: async (req, res, next) => {
    try {
      const usersCache = await redis.get('users:get');
      if (usersCache) {
        let usersResult = JSON.parse(usersCache);
        return res.status(200).json(usersResult);
      }
      const { data: response } = await axios({
        method: 'GET',
        url: `${serviceUrl}/users`,
      });
      redis.set('users:get', JSON.stringify(response));
      return res.status(200).json({
        statusCode: 200,
        message: `Success fecth users from orchestrator`,
        data: response,
      });
    } catch (error) {
      console.log(error);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const { data: response } = await axios({
        method: 'POST',
        url: `${serviceUrl}/users`,
        data: {
          username,
          email,
          password,
          phoneNumber,
          address,
        },
      });

      const keys = await redis.keys('users:*');
      if (keys.length) {
        await redis.del(keys);
      }
      res.status(201).json({
        statusCode: 201,
        message: 'Success create user from orchestrator',
        data: response,
      });
    } catch (error) {
      console.log(error);
    }
  },

  findByUserId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { data: response } = await axios({
        method: 'GET',
        url: `${serviceUrl}/users/${id}`,
      });
      await redis.setex('users:getById', 1, JSON.stringify(response));
      res.status(200).json({
        statusCode: 200,
        message: `Success get user by id from orchestrator`,
        data: response,
      });
    } catch (error) {
      console.error;
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { data } = await axios({
        method: 'DELETE',
        url: `${serviceUrl}/users/${id}`,
      });
      const keys = await redis.keys('users:*');
      if (keys.length) {
        await redis.del(keys);
      }
      res.status(200).json({
        message: `Success delete user from orchestrator`,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
