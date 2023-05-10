const mongoose = require('mongoose');

const ComputerSchema = new mongoose.Schema({
    label: {
        type: String,
        required:true
    },
    type: {
        type: String,
        required: true
    },
});

module.exports = new mongoose.model('Computer', ComputerSchema);