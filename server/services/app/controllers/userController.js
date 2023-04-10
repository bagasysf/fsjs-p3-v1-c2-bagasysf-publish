const { compare } = require('../helpers/bcrypt');
const { sign } = require('../helpers/jsonwebtoken');
const { User } = require('../models/index');

class userController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw {
          name: 'EmailRequired',
        };
      }
      if (!password) {
        throw {
          name: 'PasswordRequired',
        };
      }
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw {
          name: 'InvalidEmailPassword',
        };
      }
      const comparePassword = compare(password, user.password);
      if (!comparePassword) {
        throw {
          name: 'InvalidEmailPassword',
        };
      }
      const token = sign({
        id: user.id,
        email: user.email,
        role: user.role,
      });
      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, password, address, phoneNumber } = req.body;
      const register = await User.create({
        username,
        email,
        password,
        address,
        phoneNumber,
      });
      res.status(200).json({
        message: `Success create Admin with id ${register.id}`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = userController;
