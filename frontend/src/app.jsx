import React from 'react'
import classnames from 'classnames'
import './base.styl'
import './showing.styl'

const floorPlan = [
  '  ffffffffff  ',
  ' ffffffffffff ',
  'ffffffffffffff',
  ' ffffffffffff ',
  '  ffffffffff  ',
]


const Seat = ({ type }) => (
  <div className={classnames(
      'seat',
      { 'seat-free': type === 'f' },
      { 'seat-placeholder': type === ' ' },
    )}
  />
)

const Row = ({ seats }) => (
  <div className="row">
    {[...seats].map(seatType => <Seat type={seatType} />)}
  </div>
)

const Showing = () => (
  <div className="showing">
    <h1>Cinema Ticket System</h1>
    <p>Choose your seats</p>
    {floorPlan.map(seats => <Row seats={seats} />)}
  </div>
)

export default () => <Showing />
