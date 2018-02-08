const router = require('express').Router();
const { AdvisorRating } = require('../models');
const passport = require('../config/auth');
const algoliasearch = require('algoliasearch');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const authenticate = passport.authorize('jwt', { session: false });
const client = algoliasearch(process.env.APP_ID, process.env.API_KEY);
const index = client.initIndex('profiles');
const calculateAverage = (ratings) => {
  return ratings.reduce((x, rati) => x + rati.rating, 0)/ratings.length
}


router
  .get('/ratings', (req, res, next) => {
    AdvisorRating.find()
      .sort({ createdAt: -1 })
      .then((ratings) => res.json(ratings))
      .catch((error) => next(error))
  })
  .post('/ratings', authenticate, (req, res, next) => {
    const newRating = req.body;

    AdvisorRating.create(newRating)
      .then((advisorRating) => {

        AdvisorRating.find({ advisorId: advisorRating.advisorId })
          .then((ratings) => {
            if (!ratings) { return next(); }
            const average = calculateAverage(ratings)
            index.partialUpdateObject({
              objectID: advisorRating.advisorId,
              averageNumber: average
            })
            .then((content) => {
              console.log('OJBID', content.objectID);
            })
            .catch(err => next(err));
          })

        res.status = 201;
        res.json(advisorRating);
      })
      .catch((error) => next(error));
  })
  .put('/ratings/:id', authenticate, (req, res, next) => {
    const updateRating = req.body;
    const userId = req.account._id;
    const ratingId = req.params.id;

    AdvisorRating.findById(ratingId)
      .then((Rating) => {
        if (!Rating) { return next(); }
        AdvisorRating.findByIdAndUpdate(ratingId, { ...updateRating, updatedAt: new Date()  }, { new: true })
          .then((advisorRating) => {
            AdvisorRating.find({ advisorId: advisorRating.advisorId })
              .then((ratings) => {
                if (!ratings) { return next(); }
                const average = calculateAverage(ratings)
                index.partialUpdateObject({
                  objectID: advisorRating.advisorId,
                  averageNumber: average
                })
                .then((content) => {
                  console.log('OJBID', content.objectID);
                })
                .catch(err => next(err));
              })
              res.status = 201;
              res.json(advisorRating);
          })

      })
      .catch((error) => next(error));
  })

module.exports = router;
