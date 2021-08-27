const app = require('./app')
const http = require('http')
const config = require('./server/utils/config')
const logger = require('./server/utils/logger')

const server = http.createServer(app)
const PORT = config.PORT || 3001

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})