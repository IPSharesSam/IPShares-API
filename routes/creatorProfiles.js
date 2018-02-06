const router = require('express').Router()
const { CreatorProfile } = require('../models')
const passport = require('../config/auth')
const algoliasearch = require('algoliasearch')

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const authenticate = passport.authorize('jwt', { session: false })
const client = algoliasearch(process.env.APP_ID, process.env.API_KEY)
const index = client.initIndex('profiles')

index.setSettings({
  searchableAttributes: ['firstName', 'lastName', 'tags', 'city', 'type']
})

router
  .get('/creator/:id', authenticate, (req, res, next) => {
    const id = req.params.id

    CreatorProfile.findById(id)
      .populate({ path: 'user', select: ['firstName', 'lastName'] })
      .then(creatorProfile => {
        if (!creatorProfile) {
          return next()
        }
        res.status = 200
        res.json(creatorProfile)
      })
      .catch(error => next(error))
  })
  .get('/account/creator', authenticate, (req, res, next) => {
    const id = req.account._id

    CreatorProfile.findOne({ user: id })
      .then(creatorProfile => {
        if (!creatorProfile) {
          const error = new Error('Creator profile not found!!')
          error.status = 404
          return next(error)
        }
        console.log(creatorProfile)
        res.json(creatorProfile._doc)
      })
      .catch(error => next(error))
  })
  .post('/creator', authenticate, (req, res, next) => {
    const userId = req.account._id
    const newCreatorProfile = { ...req.body, user: userId }

    CreatorProfile.create(newCreatorProfile)
      .then(creatorProfile => {
        index
          .addObject({
            objectID: userId,
            creatorProfileId: creatorProfile._id,
            type: 'creator',
            firstName: req.account.firstName,
            lastName: req.account.lastName,
            tags: creatorProfile.tags,
            city: creatorProfile.city,
            bio: creatorProfile.bio,
            picUrl: creatorProfile.picUrl
          })
          .then(content => {
            console.log('OJBID', content.objectID)
          })
          .catch(err => console.error(err))

        res.status = 201
        res.json(creatorProfile)
      })
      .catch(error => next(error))
  })
  .put('/creator/:id', authenticate, (req, res, next) => {
    const creatorProfileId = req.params.id
    const newProfile = req.body
    const userId = req.account._id

    CreatorProfile.findByIdAndUpdate(
      creatorProfileId,
      {
        ...newProfile,
        user: userId
      },
      { new: true }
    )
      .then(creatorProfile => {
        if (!creatorProfile) {
          return next()
        }
        index
          .saveObject({
            objectID: userId,
            creatorProfileId: creatorProfile._id,
            type: 'creator',
            firstName: req.account.firstName,
            lastName: req.account.lastName,
            tags: creatorProfile.tags,
            city: creatorProfile.city,
            bio: creatorProfile.bio,
            picUrl: creatorProfile.picUrl
          })
          .then(content => {
            console.log('Updated', content.objectID)
          })
          .catch(err => console.error(err))

        res.status = 200
        res.json(creatorProfile)
      })
      .catch(error => next(error))
  })
  .patch('/creator/:id', authenticate, (req, res, next) => {
    const creatorProfileId = req.params.id
    const newProfile = req.body
    const userId = req.account._id

    CreatorProfile.findByIdAndUpdate(
      creatorProfileId,
      {
        ...newProfile,
        user: userId
      },
      { new: true }
    )
      .then(creatorProfile => {
        if (!creatorProfile) {
          return next()
        }
        index
          .saveObject({
            objectID: userId,
            creatorProfileId: creatorProfile._id,
            type: 'creator',
            firstName: req.account.firstName,
            lastName: req.account.lastName,
            tags: creatorProfile.tags,
            city: creatorProfile.city,
            bio: creatorProfile.bio,
            picUrl: creatorProfile.picUrl
          })
          .then(content => {
            console.log('Updated', content.objectID)
          })
          .catch(err => console.error(err))

        res.status = 200
        res.json(creatorProfile)
      })
      .catch(error => next(error))
  })
  .delete('/creator/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    const userId = req.account._id

    CreatorProfile.findById(id)
      .then(creatorProfile => {
        if (!creatorProfile) {
          return next()
        }

        CreatorProfile.findByIdAndRemove(id)
          .then(res => {
            if (!res) {
              return next()
            }
            index
              .deleteObject(userId)
              .then(content => {
                console.log('Deleted', content.objectID)
              })
              .catch(err => console.error(err))
            res.status = 204
          })
          .catch(error => next(error))
      })
      .catch(error => next(error))
  })

module.exports = router
