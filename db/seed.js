
const request = require('superagent')
const user = require('./fixtures/user.json')
// const properties = require('./fixtures/properties.json')

const createUrl = (path) => {
  return `${process.env.HOST || `http://localhost:${process.env.PORT || 3030}`}${path}`
}

// const createProperties = (token) => {
//   return properties.map((propertie) => {
//     return request
//       .post(createUrl('/properties'))
//       .set('Authorization', `Bearer ${token}`)
//       .send(propertie)
//       .then((res) => {
//         console.log('propertie seeded...', res.body.number)
//       })
//       .catch((err) => {
//         console.error('Error seeding propertie!', err)
//       })
//   })
// }

const authenticate = (email, password) => {
  request
    .post(createUrl('/sessions'))
    .send({ email, password })
    .then((res) => {
      console.log('Authenticated!')
      // return createProperties(res.body.token)
    })
    .catch((err) => {
      console.error('Failed to authenticate!', err.message)
    })
}

request
  .post(createUrl('/users'))
  .send(user)
  .then(() => {
    console.log('User created!')
    return authenticate(user.email, user.password)
  })
  .catch((err) => {
    console.error('Could not create user', err.message)
    console.log('Trying to continue...')
    authenticate(user.email, user.password)
  })
