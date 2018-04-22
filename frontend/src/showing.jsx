import React from 'react'
import classnames from 'classnames'
import './showing.styl'

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

export default ({ floorPlan }) => (
  <div className="showing">
    <h1>Cinema Ticket System</h1>
    <p>Choose your seats</p>
    {floorPlan.map(seats => <Row seats={seats} />)}
  </div>
)
