const Reservation = require('../models/reservationModel')
const axios = require('axios')

exports.getReservations = async (req, res) => {
    const reservations = await Reservation.find();
    if (!reservations) {
        res.status(404).send({ message: `No data found` })
    }
    else {
        res.send(reservations);
    }
}


exports.getReservation = async (req, res) => {
    const reservation = await Reservation.findById(req.params.id)
    if (!reservation) {
        res.status(404).send({ message: `Cannot get reservation with id : ${req.params.id}` })
    }
    else {
        res.send(reservation);
    }
}

exports.addReservation = (req, res) => {
    let reservation = new Reservation({
        ID_computer: req.body.ID_computer,
        ID_user: req.body.ID_user,
        date: req.body.date,
        start: req.body.start,
        end: req.body.end,
    })

    
    reservation.save().then(reservation => {
        if (req.body.fromClient && req.body.fromClient === "fromClient") {
            try {
                let computer_uri = 'http://localhost:1234/api/computers'
                let user_uri = 'http://localhost:1234/api/users'
                let reservation_uri = 'http://localhost:1234/api/reservations'
                axios.all([
                    axios.get(computer_uri),
                    axios.get(user_uri),
                    axios.get(reservation_uri)
                ])
                    .then(axios.spread((computers, users, reservations) => {
                        res.render('index', { computers: computers.data, users: users.data, reservations: reservations.data })
                    }));

            } catch (error) {
                res.send({ message: "an error occured" })
            }
        } else {
            res.status(200).send(reservation)
        }
    }).catch(error => {
        res.status(500).send(`Cannot save reservation to database, error : ${error}`)
    });

}

exports.editReservation = async (req, res) => {
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedReservation) {
        res.status(404).send({ message: `Cannot edit reservation with id : ${req.params.id}` })
    } else {
        res.send(updatedReservation);
    }
}

exports.removeReservation = async (req, res) => {
    const deletedReservation = await Reservation.findByIdAndRemove(req.params.id);
    if (!deletedReservation) {
        res.status(404).send({ message: `Cannot delete reservation with id : ${req.params.id}` })
    } else {
        res.send(deletedReservation);
    }
}