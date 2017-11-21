// routes/properties.js
const router = require('express').Router()
const passport = require('../config/auth')
const { Property } = require('../models')

const authenticate = passport.authorize('jwt', { session: false })

router.get('/properties', (req, res, next) => {
  Property.find()
    // Newest properties first
    .sort({ createdAt: -1 })
    // Send the data in JSON format
    .then((properties) => res.json(properties))
    // Throw a 500 error if something goes wrong
    .catch((error) => next(error))
  })
  .get('/properties/:id', (req, res, next) => {
    const id = req.params.id

    Property.findById(id)
      .then((property) => {
        if (!property) { return next() }
        res.json(property)
      })
      .catch((error) => next(error))
  })
  .post('/properties', authenticate, (req, res, next) => {
    let newProperty = req.body
    newProperty.authorId = req.account._id

    Property.create(newProperty)
      .then((property) => res.json(property))
      .catch((error) => next(error))
  })
  .put('/properties/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    const updatedProperty = req.body

    Property.findByIdAndUpdate(id, { $set: updatedProperty }, { new: true })
      .then((property) => res.json(property))
      .catch((error) => next(error))
  })
  .patch('/properties/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    const patchForProperty = req.body

    Property.findById(id)
      .then((property) => {
        if (!property) { return next() }

        const updatedProperty = { ...property, ...patchForProperty }

        Property.findByIdAndUpdate(id, { $set: updatedProperty }, { new: true })
          .then((property) => res.json(property))
          .catch((error) => next(error))
      })
      .catch((error) => next(error))
  })
  .delete('/properties/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    Property.findByIdAndRemove(id)
      .then(() => {
        res.status = 200
        res.json({
          message: 'Removed',
          _id: id
        })
      })
      .catch((error) => next(error))
  })

module.exports = router
