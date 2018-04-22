import { initializeMongoose, dropCurrentDatabase } from '../../src/mongo'

const mongoTestUri = process.env.MONGO_TEST_URL || 'mongodb://localhost:27017/testdb'

process.on('unhandledRejection', (err) => { throw err })
;(async () => {
  await initializeMongoose(mongoTestUri)
  // eslint-disable-next-line no-undef
  run()
})()

afterEach('clean up mongodb data', async () => {
  await dropCurrentDatabase()
})
