const router = require('express').Router()
const { CreatorProfile } = require('../models')
const passport = require('../config/auth')
const authenticate = passport.authorize('jwt', { session: false })

router.get('/creator/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    userId = req.account._id
    CreatorProfile.findById(id)
      .then((creatorProfile) => {
        if (!creatorProfile) { return next() }

        if(creatorProfile.user._id !== userId){
          const error = new Error('Unauthorized')
          error.status = 401
          return next(error)
        }

        res.status = 200
        res.json(creatorProfile)
      })
      .catch((error) => next(error))
  })
  .post('/creator', authenticate, (req, res, next) => {
    let newCreatorProfile = req.body
    userId = req.account._id
    CreatorProfile.create(newCreatorProfile)
      .then((creatorProfile) => {

        if(creatorProfile.user._id !== userId){
          const error = new Error('Unauthorized')
          error.status = 401
          return next(error)
        }

        res.status = 201
        res.json(creatorProfile)
      })
      .catch((error) => next(error))
  })
  .put('/creator/:id', authenticate, (req, res, next) => {
    const creatorProfileId = req.params.id
    let updaCreatorProfile = req.body
    userId = req.account._id
    CreatorProfile.findOneAndUpdate(creatorProfileId, updaCreatorProfile)
    .then((creatorProfile) => {
      if (!creatorProfile) { return next() }

      if(creatorProfile.user._id !== userId){
        const error = new Error('Unauthorized')
        error.status = 401
        return next(error)
      }

      res.status = 200
      res.json(creatorProfile)
    })
    .catch((error) => next(error))
  })
  .patch('/creator/:id', authenticate, (req, res, next) => {
    const creatorProfileId = req.params.id
    let updaCreatorProfile = req.body
    userId = req.account._id
    CreatorProfile.findOneAndUpdate(creatorProfileId, updaCreatorProfile)
    .then((creatorProfile) => {
      if (!creatorProfile) { return next() }

      if(creatorProfile.user._id !== userId){
        const error = new Error('Unauthorized')
        error.status = 401
        return next(error)
      }

      res.status = 200
      res.json(creatorProfile)
    })
    .catch((error) => next(error))
  })
  .delete('/creator/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    userId = req.account._id

    CreatorProfile.findById(id)
      .then((creatorProfile) => {
        if (!creatorProfile) { return next() }

        if(creatorProfile.user._id !== userId){
          const error = new Error('Unauthorized')
          error.status = 401
          return next(error)
        }

        CreatorProfile.findByIdAndRemove(id)
        .then((creatorProfile) => {
          if (!creatorProfile) { return next() }
          res.status = 204
        })
        .catch((error) => next(error))
      })
    .catch((error) => next(error))
  })

module.exports = router
