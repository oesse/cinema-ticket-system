import { expect } from 'chai'

import withSeatNumbers from '../src/with-seat-numbers'

describe('withSeatNumbers', () => {
  it('takes a string and returns an array of objects', () => {
    const seats = withSeatNumbers('fff')
    expect(seats).to.eql([
      { number: 1, type: 'f' },
      { number: 2, type: 'f' },
      { number: 3, type: 'f' },
    ])
  })

  it('does not assign seat numbers to placeholders', () => {
    const seats = withSeatNumbers('f f')
    expect(seats).to.eql([
      { number: 1, type: 'f' },
      { type: ' ' },
      { number: 2, type: 'f' },
    ])
  })
})
