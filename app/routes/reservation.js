const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.get('/', reservationController.getReservations)
router.get('/:id', reservationController.getReservation)
router.post('/', reservationController.addReservation)
router.patch('/:id', reservationController.editReservation)
router.delete('/:id', reservationController.removeReservation)


module.exports = router;