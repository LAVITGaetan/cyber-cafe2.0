const axios = require('axios')
require("dotenv").config();

exports.index = async (req, res) => {
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
}