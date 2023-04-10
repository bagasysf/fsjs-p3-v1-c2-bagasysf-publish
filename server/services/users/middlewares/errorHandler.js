const errorHandler = async (err, req, res, next) => {
  try {
    if (err.name === 'EmailRequired') {
      res.status(401).json({
        message: 'Email is required',
      });
    } else if (err.name === 'UsernameRequired') {
      res.status(401).json({
        message: 'Username is required',
      });
    } else if (err.name === 'PasswordRequired') {
      res.status(401).json({
        message: 'Password is required',
      });
    } else if (err.name === 'PasswordRequired') {
      res.status(401).json({
        message: 'Password is required',
      });
    } else if (err.name === 'UserNotFound') {
      res.status(404).json({
        message: 'User is not found',
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
