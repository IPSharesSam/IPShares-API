const router = require('express').Router()
const { AdvisorProfile, AdvisorRating } = require('../models')
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
  .get('/advisor/:id', (req, res, next) => {
    const id = req.params.id

    AdvisorProfile.findById(id)
      .populate({ path: 'user', select: ['firstName', 'lastName'] })
      .then(advisorProfile => {
        if (!advisorProfile) {
          return next()
        }

        AdvisorRating.find({ advisorId: advisorProfile.user._id }).then(
          ratings => {
            const rati = !ratings ? [] : ratings
            res.status = 200
            res.json({ ...advisorProfile._doc, ratings: rati })
          }
        )
      })
      .catch(error => next(error))
  })
  .get('/account/advisor', authenticate, (req, res, next) => {
    const id = req.account._id

    AdvisorProfile.findOne({ user: id })
      .then(advisorProfile => {
        if (!advisorProfile) {
          const error = new Error('Advisor profile not found!!')
          error.status(404)
          return next(error)
        }
        console.log(advisorProfile)
        res.json(advisorProfile._doc)
      })
      .catch(error => next(error))
  })
  .post('/advisor', authenticate, (req, res, next) => {
    const userId = req.account._id
    const newAdvisorProfile = { ...req.body, user: userId }

    AdvisorProfile.create(newAdvisorProfile)
      .then(advisorProfile => {
        index
          .addObject({
            objectID: userId,
            advisorProfileId: advisorProfile._id,
            type: 'advisor',
            firstName: req.account.firstName,
            lastName: req.account.lastName,
            picUrl: advisorProfile.picUrl
          })
          .then(content => {
            console.log('OJBID', content.objectID)
          })
          .catch(err => next(err))

        res.status = 201
        res.json(advisorProfile)
      })
      .catch(error => next(error))
  })
  .put('/advisor/:id', authenticate, (req, res, next) => {
    const advisorProfileId = req.params.id
    const newProfile = req.body
    const userId = req.account._id

    AdvisorProfile.findByIdAndUpdate(
      advisorProfileId,
      {
        ...newProfile,
        user: userId
      },
      { new: true }
    )
      .then(advisorProfile => {
        if (!advisorProfile) {
          return next()
        }
        index
          .saveObject({
            objectID: userId,
            advisorProfileId: advisorProfile._id,
            type: 'advisor',
            firstName: req.account.firstName,
            lastName: req.account.lastName,
            tags: advisorProfile.tags,
            city: advisorProfile.city,
            bio: advisorProfile.bio,
            picUrl: advisorProfile.picUrl
          })
          .then(content => {
            console.log('Updated', content.objectID)
          })
          .catch(err => next(err))

        res.status = 200
        res.json(advisorProfile)
      })
      .catch(error => next(error))
  })
  .patch('/advisor/:id', authenticate, (req, res, next) => {
    const advisorProfileId = req.params.id
    const newProfile = req.body
    const userId = req.account._id

    AdvisorProfile.findByIdAndUpdate(
      advisorProfileId,
      {
        ...newProfile,
        user: userId
      },
      { new: true }
    )
      .then(advisorProfile => {
        if (!advisorProfile) {
          return next()
        }
        console.log('is the profile public ?', newProfile.checked)
        console.log('what is the latlng ?', advisorProfile.latlng)
        // if (newProfile.checked) {
        index
          .saveObject({
            objectID: userId,
            advisorProfileId: advisorProfile._id,
            type: 'advisor',
            firstName: req.account.firstName,
            lastName: req.account.lastName,
            tags: advisorProfile.tags,
            place_id: newProfile.place_id,
            address: newProfile.address,
            latlng: advisorProfile.latlng,
            bio: advisorProfile.bio,
            picUrl: advisorProfile.picUrl
          })
          .then(content => {
            console.log('Updated', content.objectID)
          })
        // }
        res.status = 200
        res.json(advisorProfile)
      })
      .catch(error => next(error))
  })
  .delete('/advisor/:id', authenticate, (req, res, next) => {
    const id = req.params.id
    const userId = req.account._id

    AdvisorProfile.findById(id)
      .then(advisorProfile => {
        if (!advisorProfile) {
          return next()
        }

        AdvisorProfile.findByIdAndRemove(id)
          .then(advisorProfileDel => {
            if (!advisorProfileDel) {
              return next()
            }
            index
              .deleteObject(userId)
              .then(content => {
                console.log('Deleted', content.objectID)
              })
              .catch(err => next(err))
            res.status = 204
          })
          .catch(error => next(error))
      })
      .catch(error => next(error))
  })

module.exports = router
