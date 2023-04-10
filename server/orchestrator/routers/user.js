const express = require('express');
const router = express.Router();

const {
  findAllUsers,
  createUser,
  findByUserId,
  deleteUserById,
} = require('../controllers/user');

router.get('/', findAllUsers);
router.post('/', createUser);
router.get('/:id', findByUserId);
router.delete('/:id', deleteUserById);

module.exports = router;
