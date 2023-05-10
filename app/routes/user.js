const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers)
router.get('/:id', userController.getUser)
router.post('/', userController.addUser)
router.patch('/:id', userController.editUser)
router.delete('/:id', userController.removeUser)


module.exports = router;