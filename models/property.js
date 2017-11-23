const mongoose = require('../config/database')
const { Schema } = mongoose

const propertieschema = new Schema({
  trademark_name: {type: String },
  application_number: {type: String },
  application_language: {type: String },
  application_date: {type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('properties', propertieschema)
