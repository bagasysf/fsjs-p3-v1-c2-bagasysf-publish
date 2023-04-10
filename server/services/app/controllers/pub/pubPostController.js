const { Post, Category, Tag, User } = require('../../models/index');

class pubPostController {
  static async getPosts(req, res, next) {
    try {
      const posts = await Post.findAll({
        include: [Category, Tag],
      });
      res.status(200).json({
        posts,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getPostBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      console.log(slug);
      const post = await Post.findOne({
        where: {
          slug,
        },
        include: [Category, Tag, User],
      });
      res.status(200).json({
        post,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = pubPostController;
