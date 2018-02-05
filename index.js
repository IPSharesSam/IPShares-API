const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('./config/auth')
const {
  trademarks,
  users,
  sessions,
  creatorProfiles,
  advisorProfiles,
  advisorRatings
} = require('./routes')

const port = process.env.PORT || 3030

const getOrigin =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://ipshares-react.herokuapp.com'

var corsOptions = {
  origin: getOrigin,
  optionsSuccessStatus: 200
}

const app = express()

app.use(cors(corsOptions))
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())

  .use(trademarks)
  .use(users)
  .use(sessions)
  .use(creatorProfiles)
  .use(advisorProfiles)
  .use(advisorRatings)

  // catch 404 and forward to error handler
  .use((req, res, next) => {
    const err = new Error('Not Found')
    next({ ...err, status: 404 })
  })

  // final error handler
  .use((err, req, res) => {
    // res.status(err.status || 500)
    res.send({
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    })
  })

  .listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
