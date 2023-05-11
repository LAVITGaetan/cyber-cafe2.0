const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const computerRoutes = require('./app/routes/computer')
const userRoutes = require('./app/routes/user')
const reservationRoutes = require('./app/routes/reservation')
const Services = require('./app/services/render')

const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
// Getting PORT variable
require('dotenv').config();
const PORT = process.env.PORT || 8080;

// Log request 
app.use(morgan('tiny'));

// Set view engine
app.set("view engine", "ejs");

// Load assets
app.use(express.static(__dirname + '/assets'));

// Routes
app.get('/', (req, res) => {
    res.send('Server is running')
})

app.use('/index', Services.index)


app.use('/api/computers', computerRoutes)
app.use('/api/users', userRoutes)
app.use('/api/reservations', reservationRoutes)


mongoose.set('strictQuery', false);
// connect to database
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true, })
    .then(() => {
        console.log('connected to database');
    }).catch(error => {
        console.log(`an error happened : ${error}`);
    })

app.listen(PORT, () => { console.log(`Application is running on http://localhost:${PORT}`); })
