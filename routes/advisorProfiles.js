const router = require('express').Router();
const { AdvisorProfile, AdvisorRating } = require('../models');
const passport = require('../config/auth');
const algoliasearch = require('algoliasearch');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}


const authenticate = passport.authorize('jwt', { session: false });
const client = algoliasearch(process.env.APP_ID, process.env.API_KEY);
const index = client.initIndex('advisors');


index.setSettings({
  searchableAttributes: [
    'firstName',
    'lastName',
    'tags',
    'city'
  ]
});

router
  .get('/advisor/:id', (req, res, next) => {
    const id = req.params.id;

    AdvisorProfile.findById(id)
    .populate({ path: 'user', select: ['firstName', 'lastName'] })
      .then((advisorProfile) => {
        if (!advisorProfile) { return next(); }
        AdvisorRating.find({advisorId: advisorProfile.user._id})
          .then((ratings) => {
            const rati = !ratings ? [] : ratings
            res.status = 200;
            res.json({ ...advisorProfile._doc, ratings: rati });
          })
      })
      .catch((error) => next(error));
  })
  .get('/account/advisor', authenticate, (req, res, next) => {
    const id = req.account._id;
    console.log(req.account)
    AdvisorProfile.findOne({ user: id })
    .then((advisorProfile) => {
      if (!advisorProfile) {
        const error = new Error('Advisor profile not found!!');
        error.status = 404;
        return next(error);
      }
      console.log(advisorProfile)
      res.json(advisorProfile._doc);
    })
    .catch((error) => next(error));
  })
  .post('/advisor', authenticate, (req, res, next) => {
    const userId = req.account._id;
    const newAdvisorProfile = { ...req.body, user: userId };

    AdvisorProfile.create(newAdvisorProfile)
      .then((advisorProfile) => {
        // if(advisorProfile.user._id !== userId){
        //   const error = new Error('Unauthorized')
        //   error.status = 401
        //   return next(error)
        // }

        index.addObject({
          objectID: req.account._id,
          advisorProfileId: advisorProfile._id,
          firstName: req.account.firstName,
          lastName: req.account.lastName,
          tags: advisorProfile.tags,
          city: advisorProfile.city,
          bio: advisorProfile.bio,
          picUrl: advisorProfile.picUrl
        })
        .then((content) => {
          console.log('OJBID', content.objectID);
        })
        .catch(err => console.error(err));

        res.status = 201;
        res.json(advisorProfile);
      })
      .catch((error) => next(error));
  })
  .put('/advisor/:id', authenticate, (req, res, next) => {
    const advisorProfileId = req.params.id;
    const updaAdvisorProfile = req.body;
    const userId = req.account._id;
    AdvisorProfile.findOneAndUpdate(advisorProfileId, { ...updaAdvisorProfile, user: userId})
    .then((advisorProfile) => {
      if (!advisorProfile) { return next(); }

      // if (advisorProfile.user._id !== userId) {
      //   const error = new Error('Unauthorized');
      //   error.status = 401;
      //   return next(error);
      // }

      res.status = 200;
      res.json(advisorProfile);
    })
    .catch((error) => next(error));
  })
  .patch('/advisor/:id', authenticate, (req, res, next) => {
    const advisorProfileId = req.params.id;
    const updaAdvisorProfile = req.body;
    const userId = req.account._id;
    AdvisorProfile.findOneAndUpdate(advisorProfileId, updaAdvisorProfile)
    .then((advisorProfile) => {
      if (!advisorProfile) { return next(); }

      if (advisorProfile.user._id !== userId) {
        const error = new Error('Unauthorized');
        error.status = 401;
        return next(error);
      }

      res.status = 200;
      res.json(advisorProfile);
    })
    .catch((error) => next(error));
  })
  .delete('/advisor/:id', authenticate, (req, res, next) => {
    const id = req.params.id;
    const userId = req.account._id;

    AdvisorProfile.findById(id)
      .then((advisorProfile) => {
        if (!advisorProfile) { return next(); }

        if (advisorProfile.user._id !== userId) {
          const error = new Error('Unauthorized');
          error.status = 401;
          return next(error);
        }

        AdvisorProfile.findByIdAndRemove(id)
        .then((advisorProfileDel) => {
          if (!advisorProfileDel) { return next(); }
          res.status = 204;
        })
        .catch((error) => next(error));
      })
    .catch((error) => next(error));
  });

module.exports = router;
