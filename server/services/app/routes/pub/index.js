const express = require('express');
const publicPostRouter = require('./pubPostRouter');
const publicCategoryRouter = require('./pubCategoryRouter');
const router = express.Router();

router.use(publicPostRouter);
router.use(publicCategoryRouter);

module.exports = router;
