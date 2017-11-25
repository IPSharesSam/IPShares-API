// routes/trademarks.js
const router = require('express').Router()
const passport = require('../config/auth')
const { Trademark } = require('../models')

const authenticate = passport.authorize('jwt', { session: false })

// const exec = require('child_process').exec

// function startScript(input) {
//   exec(`ruby scripts/test.rb ${input}`, function (error, stdout, stderr) {
//     console.log('stdout: ' + stdout);
//     console.log('stderr: ' + stderr);
//     console.log('error: ' + error);
//   });
//   return input
// }

function startScript(input) {
  return {  
      "trademark_name": input,
      "application_number": "1234567890",
      "application_language": "NL",
      "application_date": "12-12-2012"
  }
}

router.get('/trademarks', (req, res, next) => {
  Trademark.find()
    .sort({ createdAt: -1 })
    .then((trademarks) => res.json(trademarks))
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
  .get('/trademarks/search/:input', (req, res, next) => {
    const input = req.params.input
    
    res.json(startScript(input))
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