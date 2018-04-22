import Promise from 'bluebird'
import http from 'http'

import logger from './logger'
import restApi from './rest-api'
import { initializeMongoose } from './mongo'

const port = process.env.BACKEND_PORT || 8081
const mongoUri = process.env.MONGO_URL || 'mongodb://localhost:27017/cinematickets'

;(async () => {
  const server = http.createServer(restApi)

  await initializeMongoose(mongoUri)
  logger.info('connected to mongodb')

  await Promise.fromCallback(cb => server.listen({ port }, cb))
  logger.info('service started')
})()
