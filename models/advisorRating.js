const mongoose = require('../config/database')
const passportLocalMongoose = require('passport-local-mongoose')
const { Schema } = mongoose

const advisorRatingSchema = new Schema({
  advisorId: { type: Schema.Types.ObjectId, ref: 'users' },
  clientId: { type: Schema.Types.ObjectId, ref: 'users' },
  rating: { type: Number, required: true, default: 0 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('advisorRatings', advisorRatingSchema)
