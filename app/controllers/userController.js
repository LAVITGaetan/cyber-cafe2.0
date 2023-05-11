const User = require('../models/userModel')
const axios = require('axios')

exports.getUsers = async (req, res) => {
    const users = await User.find();
    if (!users) {
        res.status(404).send({ message: `No data found` })
    }
    else {
        res.send(users);
    }
}


exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(404).send({ message: `Cannot get user with id : ${req.params.id}` })
    }
    else {
        res.send(user);
    }
}

exports.addUser = (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
    })

    user.save().then(user => {
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
            res.status(200).send(user)
        }
    }).catch(error => {
        res.status(500).send(`Cannot save user to database, error : ${error}`)
    });

}

exports.editUser = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedUser) {
        res.status(404).send({ message: `Cannot edit user with id : ${req.params.id}` })
    } else {
        res.send(updatedUser);
    }
}

exports.removeUser = async (req, res) => {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (!deletedUser) {
        res.status(404).send({ message: `Cannot delete user with id : ${req.params.id}` })
    } else {
        res.send(deletedUser);
    }
}