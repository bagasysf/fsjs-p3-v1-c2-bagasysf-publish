const { Category } = require('../models/index');

class categoryController {
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json({
        categories,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async postCategory(req, res, next) {
    try {
      const { name } = req.body;
      const category = await Category.create({
        name: name,
      });
      res.status(201).json({
        category,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const findCategory = await Category.findByPk(id);
      await Category.update(
        {
          name: name,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({
        message: `Success update category name ${findCategory.name} to ${name} with id ${findCategory.id}`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async destroyCategory(req, res, next) {
    try {
      const { id } = req.params;
      const findCategory = await Category.findByPk(id);
      await Category.destroy({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: `Success delete category name ${findCategory.name} with id ${findCategory.id}`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = categoryController;
