import React from 'react'
import Showing from './showing'
import './base.styl'

const floorPlan = [
  '  ffffffffff  ',
  ' ffffffffffff ',
  'ffffffffffffff',
  ' ffffffffffff ',
  '  ffffffffff  ',
]

export default () => <Showing floorPlan={floorPlan} />
