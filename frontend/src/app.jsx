import React from 'react'
import Showing from './showing'
import './base.styl'

const floorPlan = [
  '  ffffffffff',
  ' fffffffffff',
  ' ffffffffffff',
  ' fffffffffff',
  '  ffffffffff',
]

export default () => <Showing floorPlan={floorPlan} />
