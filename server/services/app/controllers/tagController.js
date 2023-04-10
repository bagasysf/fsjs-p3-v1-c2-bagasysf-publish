const { Tag } = require('../models/index');

class tagController {
  static async getTags(req, res, next) {
    try {
      const { postId } = req.params;
      const tag = await Tag.findAll({
        where: {
          PostId: postId,
        },
      });
      res.status(200).json({
        tag,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = {
  tagController,
};
