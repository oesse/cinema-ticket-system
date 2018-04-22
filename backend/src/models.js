import mongoose from 'mongoose'
import { now } from './time'

const showingSchema = mongoose.Schema({
  date: Date,
  theatre: String,
  reservations: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
})
class ShowingClass {
  reserveSeat(userId, row, number) {
    const key = `${row}.${number}`
    if (!this.reservations) {
      this.reservations = {}
    }

    if (this.reservations[key]) {
      const err = new Error('seat already reserved')
      err.type = 'already-reserved'
      throw err
    }

    this.reservations[key] = {
      userId, row, number, date: now(),
    }
    this.markModified('reservations')
  }
  cancelReservation(userId, row, number) {
    const key = `${row}.${number}`
    if (!this.reservations || !this.reservations[key]) {
      return
    }
    if (userId !== this.reservations[key].userId) {
      const err = new Error('seat reservation by other user')
      err.type = 'reserved-by-other-user'
      throw err
    }
    delete this.reservations[key]
    this.markModified('reservations')
  }
}
showingSchema.loadClass(ShowingClass)

export const Showing = mongoose.model('Showing', showingSchema)
