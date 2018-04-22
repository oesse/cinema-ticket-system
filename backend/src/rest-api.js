import express from 'express'
import Router from 'express-promise-router'
import bodyParser from 'body-parser'
import cors from 'cors'

import { logRequestErrors } from './logger'
import { Showing } from './models'
import getReservedFloorPlan from './get-reserved-floor-plan'
import removeExpiredReservations from './remove-expired-reservations'

const reservationLimit = 10

// TODO: getShowingById
async function getShowing() {
  let showing = await Showing.findOne()
  if (!showing) {
    showing = new Showing({
      date: new Date(2018, 4, 22, 22, 0),
    })
  }

  const currentReservations = removeExpiredReservations(showing.reservations, reservationLimit)
  if (currentReservations !== showing.reservations) {
    showing.reservations = currentReservations
    await showing.save()
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
  const { userId } = req.query
  const showing = await getShowing()
  const floorPlan = getReservedFloorPlan(floorPlanLayout, showing.reservations, userId)
  res.json(floorPlan)
})

router.post('/reserve-seat', async (req, res) => {
  const { row, number, userId } = req.body
  const showing = await getShowing()
  showing.reserveSeat(userId, row, number)
  await showing.save()

  const floorPlan = getReservedFloorPlan(floorPlanLayout, showing.reservations, userId)
  res.json(floorPlan)
})

router.post('/cancel-seat', async (req, res) => {
  const { row, number, userId } = req.body
  const showing = await getShowing()
  showing.cancelReservation(userId, row, number)
  await showing.save()

  const floorPlan = getReservedFloorPlan(floorPlanLayout, showing.reservations, userId)
  res.json(floorPlan)
})

restApi.use(router)
restApi.use(logRequestErrors)

export default restApi
