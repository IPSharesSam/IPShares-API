const mongoose = require('../config/database')
const passportLocalMongoose = require('passport-local-mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  advisorProfile: { type: Schema.Types.ObjectId, ref: 'advisorProfiles' },
  creatorProfile: { type: Schema.Types.ObjectId, ref: 'creatorProfiles' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })

module.exports = mongoose.model('users', userSchema)
