const express = require('express');
const pubCategoryController = require('../../controllers/pub/pubCategoryController');
const router = express.Router();

router.get('/pub/categories', pubCategoryController.getCategories);

module.exports = router;
