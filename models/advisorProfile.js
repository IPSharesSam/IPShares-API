const mongoose = require('../config/database')
const passportLocalMongoose = require('passport-local-mongoose')
const { Schema } = mongoose

const advisorProfileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  companyName: { type: String },
  streetName: { type: String },
  streetNumber: { type: String },
  postalCode: { type: String },
  city: { type: String },
  country: { type: String },
  phoneNumber: { type: String },
  picUrl: {
    type: String,
    default:
      'https://robohash.org/beataevoluptatesquas.bmp?size=200x200&set=set1'
  },
  publicAdvisor: { type: Boolean, default: false },
  tags: [],
  bio: { type: String },
  clients: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  partners: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  ratings: [{ type: Schema.Types.ObjectId, ref: 'advisorRatings' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('advisorProfiles', advisorProfileSchema)
