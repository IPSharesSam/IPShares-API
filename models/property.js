const mongoose = require('../config/database')
const { Schema } = mongoose

const propertySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('properties', propertySchema)
