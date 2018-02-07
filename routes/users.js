const router = require('express').Router()
const passport = require('../config/auth')
const { User } = require('../models')

router
  .post('/users', (req, res, next) => {
    User.register(
      new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        type: req.body.type
      }),
      req.body.password,
      (err, user) => {
        if (err) {
          err.status = 422
          return next(err)
        }

        const { firstName, lastName, email, type, createdAt, updatedAt } = user
        res
          .status(201)
          .json({ firstName, lastName, email, type, createdAt, updatedAt })
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
        error.status(401)
        console.log(error);
      }
      User.findById(req.account._id).then(user => {
        res.json(user)
      })
    }
  )

module.exports = router
