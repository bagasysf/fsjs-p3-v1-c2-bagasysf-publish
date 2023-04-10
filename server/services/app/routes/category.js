const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

router.get('/categories', categoryController.getCategories);
router.post('/categories', categoryController.postCategory);
router.put('/categories/:id', categoryController.updateCategoryById);
router.delete('/categories/:id', categoryController.destroyCategory);

module.exports = router;
