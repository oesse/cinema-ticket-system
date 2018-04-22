import express from 'express'
import Router from 'express-promise-router'
import bodyParser from 'body-parser'
import cors from 'cors'

import { logRequestErrors } from './logger'
import { Showing } from './models'
import getReservedFloorPlan from './get-reserved-floor-plan'

// TODO: getShowingById
async function getShowing() {
  let showing = await Showing.findOne()
  if (!showing) {
    showing = new Showing({
      date: new Date(2018, 4, 22, 22, 0),
      reservation: [],
    })
  }
  return showing
}

const restApi = express()
restApi.use(cors())
restApi.use(bodyParser.json())

const router = Router()

const floorPlanLayout = [
  '  ffffffffff',
  ' fffffffffff',
  ' ffffffffffff',
  ' fffffffffff',
  '  ffffffffff',
]

router.get('/floorplan', async (req, res) => {
  const showing = await getShowing()
  const floorPlan = getReservedFloorPlan(floorPlanLayout, showing.reservations)
  res.json(floorPlan)
})

router.post('/reserve-seat', async (req, res) => {
  const { row, number } = req.body
  const showing = await getShowing()
  showing.reserveSeat(row, number)
  await showing.save()

  const floorPlan = getReservedFloorPlan(floorPlanLayout, showing.reservations)
  res.json(floorPlan)
})

router.post('/cancel-reservation', async (req, res) => {
  const { row, number } = req.body
  const showing = await getShowing()
  showing.cancelReservation(row, number)
  await showing.save()

  const floorPlan = getReservedFloorPlan(floorPlanLayout, showing.reservations)
  res.json(floorPlan)
})

restApi.use(router)
restApi.use(logRequestErrors)

export default restApi
