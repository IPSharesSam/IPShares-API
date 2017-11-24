
const request = require('superagent')
const user = require('./fixtures/user.json')
const trademarks = require('./fixtures/trademarks.json')

const createUrl = (path) => {
  return `${process.env.HOST || `http://localhost:${process.env.PORT || 3030}`}${path}`
}

const createTrademarks = (token) => {
  return trademarks.map((trademark) => {
    return request
      .post(createUrl('/trademarks'))
      .set('Authorization', `Bearer ${token}`)
      .send(trademark)
      .then((res) => {
        console.log('trademark seeded...', res.body.trademark_name)
      })
      .catch((err) => {
        console.error('Error seeding trademark!', err)
      })
  })
}

const authenticate = (email, password) => {
  request
    .post(createUrl('/sessions'))
    .send({ email, password })
    .then((res) => {
      console.log('Authenticated!')
      return createTrademarks(res.body.token)
    })
    .catch((err) => {
      console.error('Failed to authenticate!', err.message)
    })
}

request
  .post(createUrl('/users'))
  .send(user)
  .then(() => {
    console.log('Scraper account created!')
    return authenticate(user.email, user.password)
  })
  .catch((err) => {
    console.error('Could not create Scraper account', err.message)
    console.log('Trying to continue...')
    authenticate(user.email, user.password)
  })
