const express = require('express');
const router = express.Router();
const computerController = require('../controllers/computerController');

router.get('/', computerController.getComputers)
router.get('/:id', computerController.getComputer)
router.post('/', computerController.addComputer)
router.patch('/:id', computerController.editComputer)
router.delete('/:id', computerController.removeComputer)


module.exports = router;