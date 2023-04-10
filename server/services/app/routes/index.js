const express = require('express');
const router = express.Router();
const loginRouter = require('./login');
const postRouter = require('./post');
const categoryRouter = require('./category');
const registerRouter = require('./register');
const tagRouter = require('./tag');
const publicRouter = require('./pub/index');
// const authentication = require('../middlewares/autentication');

router.use(publicRouter);

router.use(loginRouter);
// router.use(authentication);
router.use(postRouter);
router.use(categoryRouter);
router.use(registerRouter);
router.use(tagRouter);

module.exports = router;
