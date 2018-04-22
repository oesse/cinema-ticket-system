import { expect } from 'chai'

import getReservedFloorPlan from '../src/get-reserved-floor-plan'

describe('getReservedFloorPlan', () => {
  context('when there are no reservations', () => {
    it('returns the floorplan as is', () => {
      const floorPlan = ['fff']
      const reservations = {}
      const newFloorPlan = getReservedFloorPlan(floorPlan, reservations)
      expect(newFloorPlan).to.equal(floorPlan)
    })
  })

  context('when there is one reservation', () => {
    it('returns a new floorplan with the reserved seat marked', () => {
      const floorPlan = ['fff']
      const reservations = { 1.1: { row: 1, number: 1 } }
      const newFloorPlan = getReservedFloorPlan(floorPlan, reservations)
      expect(newFloorPlan).to.eql(['rff'])
    })
  })

  context('when there are mulitple reservations', () => {
    it('returns a new floorplan with the reserved seats marked', () => {
      const floorPlan = ['fff', 'ffff']
      const reservations = {
        1.1: { row: 1, number: 1 },
        2.3: { row: 2, number: 3 },
      }
      const newFloorPlan = getReservedFloorPlan(floorPlan, reservations)
      expect(newFloorPlan).to.eql(['rff', 'ffrf'])
    })
  })

  context('when there are placeholders', () => {
    it('returns a new floorplan with the reserved seat marked', () => {
      const floorPlan = ['ff ff']
      const reservations = {
        1.3: { row: 1, number: 3 },
      }
      const newFloorPlan = getReservedFloorPlan(floorPlan, reservations)
      expect(newFloorPlan).to.eql(['ff rf'])
    })
  })
})
