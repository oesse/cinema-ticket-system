import mongoose from 'mongoose'
import Promise from 'bluebird'

export async function initializeMongoose(uri) {
  mongoose.Promise = Promise
  await mongoose.connect(uri, { bufferCommands: false })
}
export async function dropCurrentDatabase() {
  await mongoose.connection.dropDatabase()
}
