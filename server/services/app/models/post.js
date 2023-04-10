'use strict';
const { Model } = require('sequelize');
const { slug } = require('../helpers/slugify');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.Category);
      Post.hasMany(models.Tag, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        hooks: true,
      });
      // Post.belongsTo(models.User, {
      //   foreignKey: 'AuthorId',
      // });
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Title is required',
          },
          notEmpty: {
            msg: 'Title is required',
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Slug is required',
          },
          notEmpty: {
            msg: 'Slug is required',
          },
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Content is required',
          },
          notEmpty: {
            msg: 'Content is required',
          },
        },
      },
      imgUrl: DataTypes.STRING,
      CategoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      AuthorId: {
        type: DataTypes.INTEGER,
        // references: {
        //   model: 'Users',
        //   key: 'id',
        // },
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
      },
      MongoId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  Post.beforeValidate(async (post, options) => {
    post.slug = slug(post.title);
  });
  return Post;
};
