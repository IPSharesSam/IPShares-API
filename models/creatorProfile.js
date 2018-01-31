const mongoose = require('../config/database')
const passportLocalMongoose = require('passport-local-mongoose')
const { Schema } = mongoose

const creatorProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  streetName: { type: String, required: true },
  streetNumber: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  publicCreator: { type: Boolean, default: false },
  tags: [],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('creatorProfiles', creatorProfileSchema)
