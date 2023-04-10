const { verify } = require('../helpers/jsonwebtoken');

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw {
        name: 'InvalidToken',
      };
    }
    const dataUser = verify(access_token);
    if (!access_token) {
      throw {
        name: 'InvalidToken',
      };
    }
    req.user = {
      id: dataUser.id,
      email: dataUser.email,
      role: dataUser.role,
    };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = authentication;
