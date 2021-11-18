const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const db = mongoose.connection;
require('dotenv').config()

//Port
const PORT = process.env.PORT || 3003

//Database
const MONGODB_URI  = process.env.MONGODB_URI

// Connect to Mongo
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//middleware
app.use(express.json())
app.use(cors())

//controllers
const storeController = require('./controllers/store.js');
const userController = require('./controllers/profiles.js');
app.use('/users', userController)
app.use('/store', storeController)

//Route
app.get('/', (req, res) => {
    res.redirect('/store')
})

//Listeners
app.listen(PORT, () => {
  console.log('Listening on...', PORT);
})
