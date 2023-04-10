const errorHandler = async (err, req, res, next) => {
  try {
    if (err.name === 'EmailRequired') {
      res.status(400).json({
        message: 'Email is required',
      });
    } else if (err.name === 'PasswordRequired') {
      res.status(400).json({
        message: 'Password is required',
      });
    } else if (err.name === 'InvalidEmailPassword') {
      res.status(400).json({
        message: 'Invalid Email/Password',
      });
    } else if (err.name === 'InvalidToken') {
      res.status(401).json({
        message: 'Invalid Token',
      });
    } else if (err.name === 'SequelizeValidationError') {
      res.status(400).json({
        message: err.errors[0].message,
      });
    } else if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({
        message: 'Email must be unique',
      });
    } else if (err.name === 'JsonWebTokenError') {
      res.status(401).json({
        message: 'Invalid Token',
      });
    } else {
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = errorHandler;
