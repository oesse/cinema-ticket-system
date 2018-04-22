import { expect } from 'chai'
import { OK, CONFLICT, FORBIDDEN } from 'http-status-codes'
import request from 'supertest'

import api from '../src/rest-api'

const userId = 'userId'
describe('GET /floorplan', () => {
  it('returns the floorplan of a theatre', async () => {
    const { body } = await request(api)
      .get(`/floorplan?userId=${userId}`)
      .expect(OK)
    expect(body).to.be.an('array').which.has.length.above(1)
  })
})

describe('POST /reserve-seat', () => {
  it('sets the given seat to reserved and returns the new floorplan', async () => {
    const { body } = await request(api)
      .post('/reserve-seat')
      .send({ row: 1, number: 1, userId })
      .expect(OK)

    expect(body).to.be.an('array').which.has.length.above(1)
    const [firstRow] = body
    const seat = [...firstRow].find(seatOrPlaceholder => seatOrPlaceholder !== ' ')
    expect(seat).to.equal('r')
  })

  it('persists reservations for for multiple reservations', async () => {
    await request(api)
      .post('/reserve-seat')
      .send({ row: 1, number: 1, userId })
      .expect(OK)

    await request(api)
      .post('/reserve-seat')
      .send({ row: 1, number: 3, userId })
      .expect(OK)

    const { body } = await request(api)
      .get(`/floorplan?userId=${userId}`)
      .expect(OK)

    const [firstRow] = body
    expect(firstRow).to.equal('  rfrfffffff')
  })

  context('when seat is already reserved', () => {
    beforeEach('reserve seat', async () => {
      await request(api)
        .post('/reserve-seat')
        .send({ row: 1, number: 1, userId })
        .expect(OK)
    })

    it('returns CONFLICT', async () => {
      await request(api)
        .post('/reserve-seat')
        .send({ row: 1, number: 1, userId })
        .expect(CONFLICT)
    })
  })
})

describe('POST /cancel-seat', () => {
  beforeEach('reserve seat', async () => {
    await request(api)
      .post('/reserve-seat')
      .send({ row: 1, number: 1, userId })
      .expect(OK)
  })

  it('clears the reservation for the given seat', async () => {
    const { body } = await request(api)
      .post('/cancel-seat')
      .send({ row: 1, number: 1, userId })
      .expect(OK)

    const [firstRow] = body
    const seat = [...firstRow].find(seatOrPlaceholder => seatOrPlaceholder !== ' ')
    expect(seat).to.equal('f')
  })

  context('when seat is reserved by someone else', () => {
    it('returns FORBIDDEN', async () => {
      await request(api)
        .post('/cancel-seat')
        .send({ row: 1, number: 1, userId: 'otherUserId' })
        .expect(FORBIDDEN)
    })
  })
})
