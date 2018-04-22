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

  it('persists reservations for for multiple reservations', async () => {
    await request(api)
      .post('/reserve-seat')
      .send({ row: 1, number: 1 })
      .expect(OK)

    await request(api)
      .post('/reserve-seat')
      .send({ row: 1, number: 3 })
      .expect(OK)

    const { body } = await request(api)
      .get('/floorplan')
      .expect(OK)

    const [firstRow] = body
    expect(firstRow).to.equal('  rfrfffffff')
  })
})

describe('POST /cancel-reservation', () => {
  beforeEach('reserve seat', async () => {
    await request(api)
      .post('/reserve-seat')
      .send({ row: 1, number: 1 })
      .expect(OK)
  })

  it('clears the reservation for the given seat', async () => {
    const { body } = await request(api)
      .post('/cancel-reservation')
      .send({ row: 1, number: 1 })
      .expect(OK)

    const [firstRow] = body
    const seat = [...firstRow].find(seatOrPlaceholder => seatOrPlaceholder !== ' ')
    expect(seat).to.equal('f')
  })
})
