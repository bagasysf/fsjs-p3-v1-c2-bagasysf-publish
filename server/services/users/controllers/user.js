const User = require('../models/user');

module.exports = {
  findAllUsers: async (req, res, next) => {
    try {
      const data = await User.findAll();
      res.status(200).json({
        statusCode: 200,
        message: 'Success fecth users from service users',
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  createUser: async (req, res, next) => {
    try {
      const { email, username, password, phoneNumber, address } = req.body;
      if (!email) {
        throw {
          name: 'EmailRequired',
        };
      }
      if (!username) {
        throw {
          name: 'UsernameRequired',
        };
      }
      if (!password) {
        throw {
          name: 'PasswordRequired',
        };
      }
      const newUser = await User.createUser({
        username,
        email,
        password,
        phoneNumber,
        address,
      });

      res.status(201).json({
        statusCode: 201,
        message: 'Success create from service users',
        data: {
          id: newUser.insertedId, //dapat dari mongoDB
          username,
          email,
          password,
          phoneNumber,
          address,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  findUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const foundUser = await User.findById(id);

      res.status(200).json({
        data: foundUser,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  deleteUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const findDestroyUser = await User.findById(id);

      if (findDestroyUser) {
        await User.destroyById(id);
        res.status(200).json({
          statusCode: 200,
          message: `Success delete user: ${findDestroyUser.email}`,
        });
      } else {
        throw {
          name: 'UserNotFound',
        };
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
