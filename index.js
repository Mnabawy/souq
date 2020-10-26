const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const errorHandler = require('errorhandler');
const path = require('path');
// configure mongoose's promise to global promise
mongoose.Promise = global.Promise

// configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

// initiate our app
const app = express()

// configure our app

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'app secret', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if (!isProduction) {
  app.use(errorHandler());
}

// Error handlers & middlewares
if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      }
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    }
  })
})

// connect mongoose
const uri = require('./src/config/index').DbUri

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('db connected'))
  .catch(err => console.error(err))
mongoose.set('debug', true);

// models & routes
require('./src/models/user');

const port = 3000

app.get('/', (req, res) => {
  res.send('hello world');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})