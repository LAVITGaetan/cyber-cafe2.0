const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    ID_computer: {
        type: String,
        required:true
    },
    ID_user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model('Reservation', ReservationSchema);