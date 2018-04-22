import express from 'express'
import Router from 'express-promise-router'
import cors from 'cors'

import { logRequestErrors } from './logger'

const restApi = express()
restApi.use(cors())

const router = Router()

router.get('/floorplan', (req, res) => {
  const floorPlan = [
    '  ffffffffff',
    ' fffffffffff',
    ' ffffffffffff',
    ' fffffffffff',
    '  ffffffffff',
  ]

  res.json(floorPlan)
})

restApi.use(router)
restApi.use(logRequestErrors)

export default restApi
