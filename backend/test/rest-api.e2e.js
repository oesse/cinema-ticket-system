import { expect } from 'chai'
import { OK } from 'http-status-codes'
import request from 'supertest'

import api from '../src/rest-api'

describe('GET /floorplan', () => {
  it('returns the floorplan of a theatre', async () => {
    const { body } = await request(api)
      .get('/floorplan')
      .expect(OK)
    expect(body).to.be.an('array').which.has.length.above(1)
  })
})

describe('POST /reserve-seat', () => {
  it('sets the given seat to reserved and returns the new floorplan', async () => {
    const { body } = await request(api)
      .post('/reserve-seat')
      .send({ row: 1, number: 1 })
      .expect(OK)
    expect(body).to.be.an('array').which.has.length.above(1)
    const [firstRow] = body
    const seat = [...firstRow].find(seatOrPlaceholder => seatOrPlaceholder !== ' ')
    expect(seat).to.equal('r')
  })
})
