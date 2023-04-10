const { Post, Category, Tag, User, sequelize } = require('../models/index');

class postController {
  static async getPosts(req, res, next) {
    try {
      const posts = await Post.findAll({
        include: [Category, Tag],
        order: [['id', 'DESC']],
      });
      res.status(200).json({
        statusCode: 200,
        message: `Success fetch post from service app`,
        data: posts,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async postPost(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { title, content, imgUrl, CategoryId, nameTag } = req.body;
      const post = await Post.create(
        {
          title,
          content,
          imgUrl,
          CategoryId,
          MongoId: '63f836809cf083c9c41fe2ba',
          // AuthorId: req.user.id,
        },
        {
          transaction: t,
        }
      );
      let tagsFinal = [];
      // console.log(req.body);
      tagsFinal = nameTag.map((nameTag) => ({
        PostId: post.id,
        name: nameTag,
      }));
      const tags = await Tag.bulkCreate(tagsFinal, { transaction: t });
      res.status(201).json({
        post,
        tags,
      });
      await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }

  static async getPostBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const post = await Post.findOne({
        where: {
          slug,
        },
        include: [Category, Tag],
      });
      res.status(200).json({
        post,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async putPostBySlug(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { title, content, imgUrl, CategoryId, nameTag } = req.body;
      const { slug } = req.params;
      const findPost = await Post.findOne({
        where: {
          slug,
        },
        include: [Category, Tag],
      });
      // kasih error
      await Post.update(
        {
          title: title,
          content: content,
          imgUrl: imgUrl,
          CategoryId: CategoryId,
        },
        {
          where: {
            id: findPost.id,
          },
        },
        {
          transaction: t,
        }
      );
      let tagsFinal = [];
      tagsFinal = findPost.Tags.map((tag, i) => ({
        ...findPost.Tags[i].dataValues,
        name: nameTag[i],
      }));
      const updateTags = await Tag.bulkCreate(
        tagsFinal,
        {
          updateOnDuplicate: ['name'],
        },
        {
          transaction: t,
        }
      );
      res.status(200).json({
        message: `Success update post with id ${findPost.id}`,
      });
      await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
      next(error);
    }
  }

  static async deletePostBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const post = await Post.findOne({
        where: {
          slug,
        },
      });
      // console.log(post);
      await Post.destroy({
        where: {
          slug,
        },
      });
      res.status(200).json({
        message: `Success delete post with title: ${post.title}`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = postController;
