// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('./config/auth');
const { trademarks, users, sessions, creatorProfiles, advisorProfiles } = require('./routes');
// const http = require('http');

const port = process.env.PORT || 3030;
console.log(port)

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();
// const server = http.Server(app);

app
  .use(cors(corsOptions))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())

  .use(trademarks)
  .use(users)
  .use(sessions)
  .use(creatorProfiles)
  .use(advisorProfiles)

  // catch 404 and forward to error handler
  .use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  })

  // final error handler
  .use((err, req, res) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: app.get('env') === 'development' ? err : {},
    });
  })

  .listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
