const express = require('express');
const router = express.Router();

const {
  findAllUsers,
  createUser,
  findUserById,
  deleteUserById,
} = require('../controllers/user');

router.get('/', findAllUsers);
router.post('/', createUser);
router.get('/:id', findUserById);
router.delete('/:id', deleteUserById);

module.exports = router;
