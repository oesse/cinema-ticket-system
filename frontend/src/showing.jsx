import React from 'react'
import classnames from 'classnames'
import request from 'superagent'
import uuid from 'uuid'

import withSeatNumbers from './with-seat-numbers'
import Spinner from './spinner'
import './showing.styl'

const backendUriPrefix = 'http://localhost:8081'
const userId = uuid()

const Seat = ({
  row, number, type, onClick,
}) => {
  const handleClick = type !== ' '
    ? () => onClick({ row, number, type })
    : undefined

  return (
    <div
      className={classnames(
        'seat',
        { 'seat-free': type === 'f' },
        { 'seat-reserved': type === 'r' },
        { 'seat-unavailable': type === 'n' },
        { 'seat-placeholder': type === ' ' },
      )}
      onClick={handleClick}
    />
  )
}


const Row = ({ row, seats, onClick }) => (
  <div className="row">
    {withSeatNumbers(seats)
        .map(({ number, type }, idx) => (<Seat
          key={idx}
          row={row}
          number={number}
          type={type}
          onClick={onClick}
        />))}
  </div>
)

export default class Showing extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isPending: true }
    this.toggleSeat = this.toggleSeat.bind(this)
  }
  componentDidMount() {
    this.loadFloorplan()
  }

  loadFloorplan() {
    request
      .get(`${backendUriPrefix}/floorplan`)
      .query({ userId })
      .then(({ body: floorPlan }) => {
        this.setState({ isPending: false, floorPlan })
      })
      .catch(() => {
        this.setState({ isPending: false, hasError: true })
      })
  }
  toggleSeat(seat) {
    const { row, number, type } = seat
    const endpoint = type === 'f' ? 'reserve-seat' : 'cancel-seat'
    request
      .post(`${backendUriPrefix}/${endpoint}`)
      .send({ row, number, userId })
      .then(({ body: floorPlan }) => {
        this.setState({ floorPlan })
      })
      .catch(() => alert('seat was alread reserved'))
  }
  render() {
    if (this.state.isPending) {
      return <Spinner />
    }
    if (this.state.hasError) {
      return <div>There was an error fetching the data</div>
    }

    const { floorPlan } = this.state
    return (
      <div className="showing">
        <h1>Cinema Ticket System</h1>
        <p>Choose your seats</p>
        {
          floorPlan.map((seats, idx) => (<Row
            key={idx}
            row={idx + 1}
            seats={seats}
            onClick={this.toggleSeat}
          />))
        }
      </div>)
  }
}
