const express = require('express');
const router = express.Router();
const user = require('../routers/user');
const app = require('../routers/app');

// console.log('masuk routers  <<<');
router.use('/users', user);
router.use(app);

module.exports = router;
