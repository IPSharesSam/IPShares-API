const router = require('express').Router()
const passport = require('../config/auth')
const { User } = require('../models')

router.post('/users', (req, res, next) => {
  User.register(
    new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      streetName: req.body.streetName,
      streetNumber: req.body.streetNumber,
      postalCode: req.body.postalCode,
      city: req.body.city,
      country: req.body.country,
      phoneNumber: req.body.phoneNumber,
      subscribed: req.body.subscribed,
      public: req.body.public,
      tags: req.body.tags,
      email: req.body.email
    }), req.body.password,
    (err, user) => {
      if (err) {
        err.status = 422
        return next(err)
      }

      const { firstName, lastName, streetName, streetNumber, postalCode, city, country, phoneNumber, subscribed, public, tags, email, createdAt, updatedAt } = user
      res.status(201).json({ firstName, lastName, streetName, streetNumber, postalCode, city, country, phoneNumber, subscribed, public, tags, email, createdAt, updatedAt })
    }
  )
})

router.get('/users/me', passport.authorize('jwt', { session: false }), (req, res, next) => {
  // Once authorized, the user data should be in `req.account`!
  if (!req.account) {
    const error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }

  res.json(req.account)
})

module.exports = router
