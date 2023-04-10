const { Category } = require('../../models/index');

class pubCategoryController {
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
}

module.exports = pubCategoryController;
