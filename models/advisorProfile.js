const mongoose = require('../config/database')
const passportLocalMongoose = require('passport-local-mongoose')
const { Schema } = mongoose

const advisorProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  streetName: { type: String, required: true },
  streetNumber: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  picUrl: { type: String, default: 'https://robohash.org/beataevoluptatesquas.bmp?size=200x200&set=set1' },
  publicAdvisor: { type: Boolean, default: false },
  tags: [],
  clients: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  partners: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('advisorProfiles', advisorProfileSchema)
