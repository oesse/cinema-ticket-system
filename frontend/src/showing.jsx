import React from 'react'
import classnames from 'classnames'
import request from 'superagent'

import './showing.styl'
import './spinner.styl'

const backendUriPrefix = 'http://localhost:8081'

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
    {
      // in this case the seat index is an identity for the seat
      // eslint-disable-next-line react/no-array-index-key
      [...seats].map((seatType, idx) => <Seat key={idx} type={seatType} />)
    }
  </div>
)

const Spinner = () => <div className="spinner" />

export default class Showing extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isPending: true }
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
          // in this case the row index is an identity for the row
          // eslint-disable-next-line react/no-array-index-key
          floorPlan.map((seats, idx) => <Row key={idx} seats={seats} />)
        }
      </div>)
  }
}
