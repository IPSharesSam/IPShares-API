const router = require('express').Router()
const passport = require('../config/auth')
const { Trademark } = require('../models')

const authenticate = passport.authorize('jwt', { session: false })

const exec = require('sync-exec');

// function startScript(input) {
//   const result = exec(`ruby scripts/scrape.rb "${input}"`)

//   return JSON.parse(result.stdout)
// }


// DUMMY DATA FOR TESTING PURPOSES
function startScript(input) {
  return [
    {
      "owner_name": input,
      "trademark_number": "0987654321",
      "trademark_name": "The Cool Company",
      "application_date": "09-09-2009",
      "registration_date": "10-10-2010",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "1234567890",
      "trademark_name": "TCC",
      "application_date": "10-10-2010",
      "registration_date": "11-11-2011",
      "status": "expired"
    },
    {
      "owner_name": input,
      "trademark_number": "5432109876",
      "trademark_name": "Company Cool",
      "application_date": "11-11-2011",
      "registration_date": "12-12-2012",
      "status": "refused"
    },
    {
      "owner_name": input,
      "trademark_number": "6789012345",
      "trademark_name": "Way Cool",
      "application_date": "12-12-2012",
      "registration_date": "13-13-2013",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987612345",
      "trademark_name": "Coolio",
      "application_date": "13-13-2013",
      "registration_date": "14-14-2014",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987654321",
      "trademark_name": "The Cool Company",
      "application_date": "09-09-2009",
      "registration_date": "10-10-2010",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "1234567890",
      "trademark_name": "TCC",
      "application_date": "10-10-2010",
      "registration_date": "11-11-2011",
      "status": "expired"
    },
    {
      "owner_name": input,
      "trademark_number": "5432109876",
      "trademark_name": "Company Cool",
      "application_date": "11-11-2011",
      "registration_date": "12-12-2012",
      "status": "refused"
    },
    {
      "owner_name": input,
      "trademark_number": "6789012345",
      "trademark_name": "Way Cool",
      "application_date": "12-12-2012",
      "registration_date": "13-13-2013",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987612345",
      "trademark_name": "Coolio",
      "application_date": "13-13-2013",
      "registration_date": "14-14-2014",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987654321",
      "trademark_name": "The Cool Company",
      "application_date": "09-09-2009",
      "registration_date": "10-10-2010",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "1234567890",
      "trademark_name": "TCC",
      "application_date": "10-10-2010",
      "registration_date": "11-11-2011",
      "status": "expired"
    },
    {
      "owner_name": input,
      "trademark_number": "5432109876",
      "trademark_name": "Company Cool",
      "application_date": "11-11-2011",
      "registration_date": "12-12-2012",
      "status": "refused"
    },
    {
      "owner_name": input,
      "trademark_number": "6789012345",
      "trademark_name": "Way Cool",
      "application_date": "12-12-2012",
      "registration_date": "13-13-2013",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987612345",
      "trademark_name": "Coolio",
      "application_date": "13-13-2013",
      "registration_date": "14-14-2014",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987654321",
      "trademark_name": "The Cool Company",
      "application_date": "09-09-2009",
      "registration_date": "10-10-2010",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "1234567890",
      "trademark_name": "TCC",
      "application_date": "10-10-2010",
      "registration_date": "11-11-2011",
      "status": "expired"
    },
    {
      "owner_name": input,
      "trademark_number": "5432109876",
      "trademark_name": "Company Cool",
      "application_date": "11-11-2011",
      "registration_date": "12-12-2012",
      "status": "refused"
    },
    {
      "owner_name": input,
      "trademark_number": "6789012345",
      "trademark_name": "Way Cool",
      "application_date": "12-12-2012",
      "registration_date": "13-13-2013",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987612345",
      "trademark_name": "Coolio",
      "application_date": "13-13-2013",
      "registration_date": "14-14-2014",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987654321",
      "trademark_name": "The Cool Company",
      "application_date": "09-09-2009",
      "registration_date": "10-10-2010",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "1234567890",
      "trademark_name": "TCC",
      "application_date": "10-10-2010",
      "registration_date": "11-11-2011",
      "status": "expired"
    },
    {
      "owner_name": input,
      "trademark_number": "5432109876",
      "trademark_name": "Company Cool",
      "application_date": "11-11-2011",
      "registration_date": "12-12-2012",
      "status": "refused"
    },
    {
      "owner_name": input,
      "trademark_number": "6789012345",
      "trademark_name": "Way Cool",
      "application_date": "12-12-2012",
      "registration_date": "13-13-2013",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987612345",
      "trademark_name": "Coolio",
      "application_date": "13-13-2013",
      "registration_date": "14-14-2014",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987654321",
      "trademark_name": "The Cool Company",
      "application_date": "09-09-2009",
      "registration_date": "10-10-2010",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "1234567890",
      "trademark_name": "TCC",
      "application_date": "10-10-2010",
      "registration_date": "11-11-2011",
      "status": "expired"
    },
    {
      "owner_name": input,
      "trademark_number": "5432109876",
      "trademark_name": "Company Cool",
      "application_date": "11-11-2011",
      "registration_date": "12-12-2012",
      "status": "refused"
    },
    {
      "owner_name": input,
      "trademark_number": "6789012345",
      "trademark_name": "Way Cool",
      "application_date": "12-12-2012",
      "registration_date": "13-13-2013",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987612345",
      "trademark_name": "Coolio",
      "application_date": "13-13-2013",
      "registration_date": "14-14-2014",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987654321",
      "trademark_name": "The Cool Company",
      "application_date": "09-09-2009",
      "registration_date": "10-10-2010",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "1234567890",
      "trademark_name": "TCC",
      "application_date": "10-10-2010",
      "registration_date": "11-11-2011",
      "status": "expired"
    },
    {
      "owner_name": input,
      "trademark_number": "5432109876",
      "trademark_name": "Company Cool",
      "application_date": "11-11-2011",
      "registration_date": "12-12-2012",
      "status": "refused"
    },
    {
      "owner_name": input,
      "trademark_number": "6789012345",
      "trademark_name": "Way Cool",
      "application_date": "12-12-2012",
      "registration_date": "13-13-2013",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987612345",
      "trademark_name": "Coolio",
      "application_date": "13-13-2013",
      "registration_date": "14-14-2014",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987654321",
      "trademark_name": "The Cool Company",
      "application_date": "09-09-2009",
      "registration_date": "10-10-2010",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "1234567890",
      "trademark_name": "TCC",
      "application_date": "10-10-2010",
      "registration_date": "11-11-2011",
      "status": "expired"
    },
    {
      "owner_name": input,
      "trademark_number": "5432109876",
      "trademark_name": "Company Cool",
      "application_date": "11-11-2011",
      "registration_date": "12-12-2012",
      "status": "refused"
    },
    {
      "owner_name": input,
      "trademark_number": "6789012345",
      "trademark_name": "Way Cool",
      "application_date": "12-12-2012",
      "registration_date": "13-13-2013",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987612345",
      "trademark_name": "Coolio",
      "application_date": "13-13-2013",
      "registration_date": "14-14-2014",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987654321",
      "trademark_name": "The Cool Company",
      "application_date": "09-09-2009",
      "registration_date": "10-10-2010",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "1234567890",
      "trademark_name": "TCC",
      "application_date": "10-10-2010",
      "registration_date": "11-11-2011",
      "status": "expired"
    },
    {
      "owner_name": input,
      "trademark_number": "5432109876",
      "trademark_name": "Company Cool",
      "application_date": "11-11-2011",
      "registration_date": "12-12-2012",
      "status": "refused"
    },
    {
      "owner_name": input,
      "trademark_number": "6789012345",
      "trademark_name": "Way Cool",
      "application_date": "12-12-2012",
      "registration_date": "13-13-2013",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987612345",
      "trademark_name": "Coolio",
      "application_date": "13-13-2013",
      "registration_date": "14-14-2014",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987654321",
      "trademark_name": "The Cool Company",
      "application_date": "09-09-2009",
      "registration_date": "10-10-2010",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "1234567890",
      "trademark_name": "TCC",
      "application_date": "10-10-2010",
      "registration_date": "11-11-2011",
      "status": "expired"
    },
    {
      "owner_name": input,
      "trademark_number": "5432109876",
      "trademark_name": "Company Cool",
      "application_date": "11-11-2011",
      "registration_date": "12-12-2012",
      "status": "refused"
    },
    {
      "owner_name": input,
      "trademark_number": "6789012345",
      "trademark_name": "Way Cool",
      "application_date": "12-12-2012",
      "registration_date": "13-13-2013",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987612345",
      "trademark_name": "Coolio",
      "application_date": "13-13-2013",
      "registration_date": "14-14-2014",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987654321",
      "trademark_name": "The Cool Company",
      "application_date": "09-09-2009",
      "registration_date": "10-10-2010",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "1234567890",
      "trademark_name": "TCC",
      "application_date": "10-10-2010",
      "registration_date": "11-11-2011",
      "status": "expired"
    },
    {
      "owner_name": input,
      "trademark_number": "5432109876",
      "trademark_name": "Company Cool",
      "application_date": "11-11-2011",
      "registration_date": "12-12-2012",
      "status": "refused"
    },
    {
      "owner_name": input,
      "trademark_number": "6789012345",
      "trademark_name": "Way Cool",
      "application_date": "12-12-2012",
      "registration_date": "13-13-2013",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987612345",
      "trademark_name": "Coolio",
      "application_date": "13-13-2013",
      "registration_date": "14-14-2014",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987654321",
      "trademark_name": "The Cool Company",
      "application_date": "09-09-2009",
      "registration_date": "10-10-2010",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "1234567890",
      "trademark_name": "TCC",
      "application_date": "10-10-2010",
      "registration_date": "11-11-2011",
      "status": "expired"
    },
    {
      "owner_name": input,
      "trademark_number": "5432109876",
      "trademark_name": "Company Cool",
      "application_date": "11-11-2011",
      "registration_date": "12-12-2012",
      "status": "refused"
    },
    {
      "owner_name": input,
      "trademark_number": "6789012345",
      "trademark_name": "Way Cool",
      "application_date": "12-12-2012",
      "registration_date": "13-13-2013",
      "status": "registered"
    },
    {
      "owner_name": input,
      "trademark_number": "0987612345",
      "trademark_name": "Coolio",
      "application_date": "13-13-2013",
      "registration_date": "14-14-2014",
      "status": "registered"
    }
  ]
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
  .post('/trademarks', authenticate, (req, res, next) => {
    let newTrademark = req.body
    newTrademark.userId = req.account._id

    Trademark.create(newTrademark)
      .then((trademark) => res.json(trademark))
      .catch((error) => next(error))
  })
  .post('/trademarks/user', authenticate, (req, res, next) => {
    Trademark.find({ userId: req.account._id })
    .sort({ createdAt: -1 })
    .then((trademarks) => res.json(trademarks))
    .catch((error) => next(error))
  })
  .post('/trademarks/search', (req, res, next) => {
    const { input } = req.body
    res.json(startScript(input))
    
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
