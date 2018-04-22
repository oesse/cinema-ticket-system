import mongoose from 'mongoose'

const showingSchema = mongoose.Schema({
  date: Date,
  theatre: String,
  reservations: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
})
class ShowingClass {
  reserveSeat(row, number) {
    const key = `${row}.${number}`
    if (!this.reservations) {
      this.reservations = {}
    }
    this.reservations[key] = { row, number }
    this.markModified('reservations')
  }
  cancelReservation(row, number) {
    const key = `${row}.${number}`
    if (!this.reservations || !this.reservations[key]) {
      return
    }
    delete this.reservations[key]
    this.markModified('reservations')
  }
}
showingSchema.loadClass(ShowingClass)

export const Showing = mongoose.model('Showing', showingSchema)
