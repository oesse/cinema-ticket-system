import React from 'react'
import classnames from 'classnames'
import './showing.styl'
import './spinner.styl'

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
    setTimeout(() => this.setState({ isPending: false }), 1000)
  }
  render() {
    if (this.state.isPending) {
      return <Spinner />
    }

    const { floorPlan } = this.props
    return (
      <div className="showing">
        <h1>Cinema Ticket System</h1>
        <p>Choose your seats</p>
        {floorPlan.map(seats => <Row seats={seats} />)}
      </div>)
  }
}
