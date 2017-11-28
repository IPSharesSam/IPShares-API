// config/database.js
const mongoose = require('mongoose')

// Use native promises
mongoose.Promise = global.Promise

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ipshares'
mongoose.set('debug', true)
mongoose.connect('mongodb://heroku_jdfx9sjb:o8kftoocmacc56nh3nv673rpar@ds123556.mlab.com:23556/heroku_jdfx9sjb', { useMongoClient: true })

// Monitor DB connection
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Successfully connected to MongoDB!')
})

module.exports = mongoose
