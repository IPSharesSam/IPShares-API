const router = require('express').Router()
const { AdvisorProfile } = require('../models')

router.get('/advisor/:id', (req, res, next) => {
    const id = req.params.id
    AdvisorProfile.findById(id)
      .then((advisorProfile) => {
        if (!advisorProfile) { return next() }
        res.status = 200
        res.json(advisorProfile)
      })
      .catch((error) => next(error))
  })
  .post('/advisor', (req, res, next) => {
    let newAdvisorProfile = req.body

    AdvisorProfile.create(newAdvisorProfile)
      .then((advisorProfile) => {
        res.status = 201
        res.json(advisorProfile)
      })
      .catch((error) => next(error))
  })
  .put('/advisor/:id', (req, res, next) => {
    const advisorProfileId = req.params.id
    let updaAdvisorProfile = req.body

    AdvisorProfile.findOneAndUpdate(advisorProfileId, updaAdvisorProfile)
    .then((advisorProfile) => {
      if (!advisorProfile) { return next() }
      res.status = 200
      res.json(advisorProfile)
    })
    .catch((error) => next(error))
  })
  .patch('/advisor/:id', (req, res, next) => {
    const advisorProfileId = req.params.id
    let updaAdvisorProfile = req.body

    AdvisorProfile.findOneAndUpdate(advisorProfileId, updaAdvisorProfile)
    .then((advisorProfile) => {
      if (!advisorProfile) { return next() }
      res.status = 200
      res.json(advisorProfile)
    })
    .catch((error) => next(error))

  })
  .delete('/advisor/:id', (req, res, next) => {
    const id = req.params.id
    console.log(id)
    AdvisorProfile.findByIdAndRemove(id)
    .then((advisorProfile) => {
      if (!advisorProfile) { return next() }
      res.status = 204
    })
    .catch((error) => next(error))
  })

module.exports = router
