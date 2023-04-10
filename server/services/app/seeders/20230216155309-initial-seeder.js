'use strict';

const { hash } = require('../helpers/bcrypt');
const { slug } = require('../helpers/slugify');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const users = require('../datas/users.json').map((user) => {
      delete user.id;
      user.password = hash(user.password);
      user.createdAt = new Date();
      user.updatedAt = new Date();
      return user;
    });
    const categories = require('../datas/categories.json').map((category) => {
      delete category.id;
      category.createdAt = new Date();
      category.updatedAt = new Date();
      return category;
    });
    const posts = require('../datas/posts.json').map((post) => {
      delete post.id;
      post.slug = slug(post.title);
      post.createdAt = new Date();
      post.updatedAt = new Date();
      return post;
    });
    const tags = require('../datas/tags.json').map((tag) => {
      delete tag.id;
      tag.createdAt = new Date();
      tag.updatedAt = new Date();
      return tag;
    });
    await queryInterface.bulkInsert('Users', users, {});
    await queryInterface.bulkInsert('Categories', categories, {});
    await queryInterface.bulkInsert('Posts', posts, {});
    await queryInterface.bulkInsert('Tags', tags, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Tags', null, {});
  },
};
