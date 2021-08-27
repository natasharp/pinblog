const config = require('./server/utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./server/controllers/blogs')
const usersRouter = require('./server/controllers/users')
const loginRouter = require('./server/controllers/login')
const middleware = require('./server/utils/middleware')
const logger = require('./server/utils/logger')
const mongoose = require('mongoose')
const path = require('path')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('./client/build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.get('/health', (req, res) => {
  res.send('ok')
})

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./server/controllers/meta')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app