import { expect } from 'chai'
import { LocalDateTime } from 'js-joda'

import removeExpiredReservations from '../src/remove-expired-reservations'

describe('removeExpiredReservations', () => {
  context('when all reservations are within the time limit', () => {
    it('returns all reservations', () => {
      const reservations = {
        1.3: { row: 1, number: 3, date: LocalDateTime.of(2018, 4, 22, 18, 0, 0) },
        1.2: { row: 1, number: 2, date: LocalDateTime.of(2018, 4, 22, 17, 59, 0) },
        1.5: { row: 1, number: 5, date: LocalDateTime.of(2018, 4, 22, 18, 5, 0) },
      }
      const timeLimitInMinutes = 10
      const now = LocalDateTime.of(2018, 4, 22, 18, 8, 0)
      const filteredReservations = removeExpiredReservations(reservations, timeLimitInMinutes, now)

      expect(filteredReservations).to.eql({
        1.3: { row: 1, number: 3, date: LocalDateTime.of(2018, 4, 22, 18, 0, 0) },
        1.2: { row: 1, number: 2, date: LocalDateTime.of(2018, 4, 22, 17, 59, 0) },
        1.5: { row: 1, number: 5, date: LocalDateTime.of(2018, 4, 22, 18, 5, 0) },
      })
    })
  })

  context('when there are overdue reservations', () => {
    it('returns reservations where the overdue ones are removed', () => {
      const reservations = {
        1.3: { row: 1, number: 3, date: LocalDateTime.of(2018, 4, 22, 18, 0, 0) },
        1.2: { row: 1, number: 2, date: LocalDateTime.of(2018, 4, 22, 17, 59, 0) },
        1.5: { row: 1, number: 5, date: LocalDateTime.of(2018, 4, 22, 18, 5, 0) },
      }
      const timeLimitInMinutes = 10
      const now = LocalDateTime.of(2018, 4, 22, 18, 9, 0)
      const filteredReservations = removeExpiredReservations(reservations, timeLimitInMinutes, now)

      expect(filteredReservations).to.eql({
        1.3: { row: 1, number: 3, date: LocalDateTime.of(2018, 4, 22, 18, 0, 0) },
        1.5: { row: 1, number: 5, date: LocalDateTime.of(2018, 4, 22, 18, 5, 0) },
      })
    })
  })
})
