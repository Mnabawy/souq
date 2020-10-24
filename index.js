const express = require('express')
const mongoose = require('mongoose');



// connect mongoose
const uri = 'mongodb://test:admin123@guestbook-shard-00-00.3saiw.mongodb.net:27017,guestbook-shard-00-01.3saiw.mongodb.net:27017,guestbook-shard-00-02.3saiw.mongodb.net:27017/guestbook?ssl=true&replicaSet=atlas-iw9fj0-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology:true })
  .then(() => console.log('db connected'))
  .catch (err => console.error(err))

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('hello world');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})