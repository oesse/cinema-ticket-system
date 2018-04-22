import React from 'react'
import classnames from 'classnames'
import request from 'superagent'

import withSeatNumbers from './with-seat-numbers'
import Spinner from './spinner'
import './showing.styl'

const backendUriPrefix = 'http://localhost:8081'

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
      .then(({ body: floorPlan }) => {
        this.setState({ isPending: false, floorPlan })
      })
      .catch(() => {
        this.setState({ isPending: false, hasError: true })
      })
  }
  toggleSeat(seat) {
    console.log(seat)
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
