import { CreateUserController } from './controller/CreateUserController'
import { RouteUnavailableMiddleware } from './middleware/RouteUnavailableMiddleware'
import { ErrorHandlerMiddleware } from './middleware/ErrorHandlerMiddleware'
import { AuthenticationMiddleware } from './middleware/AuthenticationMiddelware'
import { GetUserController } from './controller/GetUserController'

const dotenv = require('dotenv')
dotenv.config()

const hostname = process.env.HOSTNAME ?? '127.0.0.1'
const port = parseInt(process.env.PORT ?? '3000')

const express = require('express')
const app = express()
app.use(express.json())

app.post('/user', CreateUserController)

app.use('/user', AuthenticationMiddleware)
app.get('/user', GetUserController)

app.use(RouteUnavailableMiddleware)
app.use(ErrorHandlerMiddleware)

app.listen(port, hostname, () => {
  console.log(`> Server running at http://${hostname}:${port}/`)
})
