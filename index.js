const express = require('express')
const mongoose = require('mongoose');



// connect mongoose
const uri = require('./src/config/index').DbUri

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('db connected'))
  .catch(err => console.error(err))

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('hello world');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})