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
