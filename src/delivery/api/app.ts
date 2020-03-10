import { CreateUserController } from './controller/CreateUserController'
import { RouteUnavailableMiddleware } from './controller/MethodUnavailableController'
import { ErrorHandlerMiddleware } from './controller/ErrorController'

const dotenv = require('dotenv')
dotenv.config()

const hostname = process.env.HOSTNAME ?? '127.0.0.1'
const port = parseInt(process.env.PORT ?? '3000')

const express = require('express')
const app = express()
app.use(express.json())

app.post('/user', CreateUserController)

app.use(RouteUnavailableMiddleware)
app.use(ErrorHandlerMiddleware)

app.listen(port, hostname, () => {
  console.log(`> Server running at http://${hostname}:${port}/`)
})
