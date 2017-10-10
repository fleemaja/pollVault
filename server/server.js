require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config')
const polls = require('./polls')
const comments = require('./comments')

const app = express()

app.use(express.static('public'))
app.use(cors())


app.get('/', (req, res) => {
  const hello = 'hello world'
  res.send(hello)
})

app.use((req, res, next) => {
  const token = req.get('Authorization')

  if (token) {
    req.token = token
    next()
  } else {
    res.status(403).send({
      error: 'Please provide an Authorization header to identify yourself (can be whatever you want)'
    })
  }
})

app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})
