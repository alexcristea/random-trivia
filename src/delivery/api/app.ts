import { CreateUserController } from './controller/CreateUserController'

const dotenv = require('dotenv')
dotenv.config()

const hostname = process.env.HOSTNAME ?? '127.0.0.1'
const port = parseInt(process.env.PORT ?? '3000')

const express = require('express')
const app = express()
app.use(express.json())

app.post('/user', CreateUserController)

app.use(function(req: any, res: any) {
  const statusCode = 404
  const message = `Cannot ${req.method} ${req.originalUrl}`

  console.log(`> ${message}`)
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  })
})

app.use((err: any, req: any, res: any, next: any) => {
  const { message, statusCode } = err

  console.log(`> ${message}`)
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  })
})

app.listen(port, () => {
  console.log(`> Server running at http://${hostname}:${port}/`)
})
