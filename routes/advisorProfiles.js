const router = require('express').Router()
const { AdvisorProfile } = require('../models')
const passport = require('../config/auth')

const authenticate = passport.authorize('jwt', { session: false })

router.get('/advisor/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    userId = req.account._id
    AdvisorProfile.findById(id)
      .then((advisorProfile) => {
        if (!advisorProfile) { return next() }

        if(advisorProfile.user._id !== userId){
          const error = new Error('Unauthorized')
          error.status = 401
          return next(error)
        }

        res.status = 200
        res.json(advisorProfile)
      })
      .catch((error) => next(error))
  })
  .post('/advisor', authenticate, (req, res, next) => {
    let newAdvisorProfile = req.body
    userId = req.account._id
    AdvisorProfile.create(newAdvisorProfile)
      .then((advisorProfile) => {

        // if(advisorProfile.user._id !== userId){
        //   const error = new Error('Unauthorized')
        //   error.status = 401
        //   return next(error)
        // }

        res.status = 201
        res.json(advisorProfile)
      })
      .catch((error) => next(error))
  })
  .put('/advisor/:id', authenticate, (req, res, next) => {
    const advisorProfileId = req.params.id
    let updaAdvisorProfile = req.body
    userId = req.account._id
    AdvisorProfile.findOneAndUpdate(advisorProfileId, updaAdvisorProfile)
    .then((advisorProfile) => {
      if (!advisorProfile) { return next() }

      if(advisorProfile.user._id !== userId){
        const error = new Error('Unauthorized')
        error.status = 401
        return next(error)
      }

      res.status = 200
      res.json(advisorProfile)
    })
    .catch((error) => next(error))
  })
  .patch('/advisor/:id', authenticate, (req, res, next) => {
    const advisorProfileId = req.params.id
    let updaAdvisorProfile = req.body
    userId = req.account._id
    AdvisorProfile.findOneAndUpdate(advisorProfileId, updaAdvisorProfile)
    .then((advisorProfile) => {
      if (!advisorProfile) { return next() }

      if(advisorProfile.user._id !== userId){
        const error = new Error('Unauthorized')
        error.status = 401
        return next(error)
      }

      res.status = 200
      res.json(advisorProfile)
    })
    .catch((error) => next(error))

  })
  .delete('/advisor/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    userId = req.account._id

    AdvisorProfile.findById(id)
      .then((advisorProfile) => {
        if (!advisorProfile) { return next() }

        if(advisorProfile.user._id !== userId){
          const error = new Error('Unauthorized')
          error.status = 401
          return next(error)
        }

        AdvisorProfile.findByIdAndRemove(id)
        .then((advisorProfile) => {
          if (!advisorProfile) { return next() }
          res.status = 204
        })
        .catch((error) => next(error))
      })
    .catch((error) => next(error))
  })

module.exports = router
