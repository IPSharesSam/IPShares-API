
const request = require('superagent')
// const user = require('./fixtures/user.json')
// const trademarks = require('./fixtures/trademarks.json')
const advisors = require('./fixtures/advisors.js')

const createUrl = (path) => {
  return `${process.env.HOST || `http://localhost:${process.env.PORT || 3030}`}${path}`
  // return `${process.env.HOST || `https://ipshares-api.herokuapp.com`}${path}`
}

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ipshares'

const createAdvisorProfiles = (token, user, oldUser) => {
  console.log('Seeding profiles...')
  console.log(token)
  var newProfile = oldUser.advisorProfile
  newProfile.user = user.body._id
  return request
    .post(createUrl('/advisor'))
    .set('Authorization', `Bearer ${token}`)
    .send(newProfile)
    .then((res) => {
      console.log('Trademark seeded...', res.body)
    })
    .catch((err) => {
      console.error('Error seeding trademark!', err)
    })
}

const authenticate = (user) => {
  console.log('Authenticating...')
  var email = user.email
  var password = user.password
  var dets = { email, password }
  request
    .post(createUrl('/sessions'))
    .send(dets)
    .then((res) => {
      console.log('Authenticated!')
      request
        .get(createUrl('/users/me'))
        .set('Authorization', `Bearer ${res.body.token}`)
        .then(getres => { createAdvisorProfiles(res.body.token, getres, user)  })
      return res
    })
    .catch((err) => {})
}

var newAdvisors = advisors()
for (let user of newAdvisors) {
  request
    .post(createUrl('/users'))
    .send(user)
    .then(() => {
      console.log('Account created!')      
      return authenticate(user)
    })
    .catch((err) => {
      console.log('Trying to continue...')
      authenticate(user.email, user.password)
    })
}

