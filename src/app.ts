import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import routers from './routers/routes'
import database from './util/database'
import { Logger } from './util/logger'
import config from '../config/config'

database.connect()
  .then()
  .catch(err => {
    Logger.error(err.message, err.stack, config.ERROR_SOURCE, err)
    process.exit()
  })

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/health', (req, res) => {
  res.end('User Management')
})
routers.forEach(router => {
  app.use('/user', router.expressRouter)
})

app.use((req, res, next) => {
  console.log(req.url)
  res.status(404).json({
    status: 'failure',
    message: `No route found for : ${req.url}`
  })
})
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
})

export default app
