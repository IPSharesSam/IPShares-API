// routes/trademarks.js
const router = require('express').Router()
const passport = require('../config/auth')
const { Trademark } = require('../models')

const authenticate = passport.authorize('jwt', { session: false })

router.get('/trademarks', (req, res, next) => {
  Trademark.find()
    // Newest trademarks first
    .sort({ createdAt: -1 })
    // Send the data in JSON format
    .then((trademarks) => res.json(trademarks))
    // Throw a 500 error if something goes wrong
    .catch((error) => next(error))
  })
  .get('/trademarks/:id', (req, res, next) => {
    const id = req.params.id

    Trademark.findById(id)
      .then((trademark) => {
        if (!trademark) { return next() }
        res.json(trademark)
      })
      .catch((error) => next(error))
  })
  .post('/trademarks', authenticate, (req, res, next) => {
    let newTrademark = req.body
    newTrademark.authorId = req.account._id

    Trademark.create(newTrademark)
      .then((trademark) => res.json(trademark))
      .catch((error) => next(error))
  })
  .put('/trademarks/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    const updatedTrademark = req.body

    Trademark.findByIdAndUpdate(id, { $set: updatedTrademark }, { new: true })
      .then((trademark) => res.json(trademark))
      .catch((error) => next(error))
  })
  .patch('/trademarks/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    const patchForTrademark = req.body

    Trademark.findById(id)
      .then((trademark) => {
        if (!trademark) { return next() }

        const updatedTrademark = { ...trademark, ...patchForTrademark }

        Trademark.findByIdAndUpdate(id, { $set: updatedTrademark }, { new: true })
          .then((trademark) => res.json(trademark))
          .catch((error) => next(error))
      })
      .catch((error) => next(error))
  })
  .delete('/trademarks/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    Trademark.findByIdAndRemove(id)
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
