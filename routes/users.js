const router = require('express').Router()
const passport = require('../config/auth')
const { User } = require('../models')

router
  .post('/users', (req, res, next) => {
    User.register(
      new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      }),
      req.body.password,
      (err, user) => {
        if (err) {
          err.status = 422
          res.status(422).send(err.message)
          return next(err)
        }

        const { firstName, lastName, email, createdAt, updatedAt } = user
        res
          .status(201)
          .json({ firstName, lastName, email, createdAt, updatedAt })
      }
    )
  })

  .get(
    '/users/me',
    passport.authorize('jwt', { session: false }),
    (req, res, next) => {
      // Once authorized, the user data should be in `req.account`!
      if (!req.account) {
        const error = new Error('Unauthorized')
        res.status(401).send(error.message)
        return next(error)
      }
      User.findById(req.account._id).then(user => {
        res.json(user)
      })
    }
  )

module.exports = router
