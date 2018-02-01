const router = require('express').Router();
const { AdvisorRating } = require('../models');
const passport = require('../config/auth');
const authenticate = passport.authorize('jwt', { session: false });

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
        if(Rating.clientId.toString() !== userId.toString()){
          const error = new Error('Unauthorized')
          error.status = 401
          return next(error)
        }
        AdvisorRating.findOneAndUpdate(ratingId, updateRating)
          .then((advisorRating) => {
            res.status = 201;
            res.json(advisorRating);
          })
      })
      .catch((error) => next(error));
  })

module.exports = router;
