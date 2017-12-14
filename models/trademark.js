const mongoose = require('../config/database')
const { Schema } = mongoose

const trademarkSchema = new Schema({
  owner_name: { type: String },  
  trademark_number: { type: String },
  trademark_name: { type: String },
  application_date: { type: String },
  registration_date: { type: String },
  status: { type: String },
  userId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('trademarks', trademarkSchema)
  