const router = require('express').Router()
const { CreatorProfile } = require('../models')
const passport = require('../config/auth')
const authenticate = passport.authorize('jwt', { session: false })

router.get('/creator/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    CreatorProfile.findById(id)
      .then((creatorProfile) => {
        if (!creatorProfile) { return next() }
        res.status = 200
        res.json(creatorProfile)
      })
      .catch((error) => next(error))
  })
  .post('/creator', authenticate, (req, res, next) => {
    let newCreatorProfile = req.body

    CreatorProfile.create(newCreatorProfile)
      .then((creatorProfile) => {
        res.status = 201
        res.json(creatorProfile)
      })
      .catch((error) => next(error))
  })
  .put('/creator/:id', authenticate, (req, res, next) => {
    const creatorProfileId = req.params.id
    let updaCreatorProfile = req.body

    CreatorProfile.findOneAndUpdate(creatorProfileId, updaCreatorProfile)
    .then((creatorProfile) => {
      if (!creatorProfile) { return next() }
      res.status = 200
      res.json(creatorProfile)
    })
    .catch((error) => next(error))
  })
  .patch('/creator/:id', authenticate, (req, res, next) => {
    const creatorProfileId = req.params.id
    let updaCreatorProfile = req.body

    CreatorProfile.findOneAndUpdate(creatorProfileId, updaCreatorProfile)
    .then((creatorProfile) => {
      if (!creatorProfile) { return next() }
      res.status = 200
      res.json(creatorProfile)
    })
    .catch((error) => next(error))

  })
  .delete('/creator/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    console.log(id)
    CreatorProfile.findByIdAndRemove(id)
    .then((creatorProfile) => {
      if (!creatorProfile) { return next() }
      res.status = 204
    })
    .catch((error) => next(error))
  })

module.exports = router
