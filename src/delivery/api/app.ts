const dotenv = require('dotenv')
dotenv.config()

const hostname = process.env.HOSTNAME ?? '127.0.0.1'
const port = parseInt(process.env.PORT ?? '3000')

const express = require('express')
const app = express()
app.use(express.json())

class HTTPErrror extends Error {
  private statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
  }
}

const userRouter = express.Router()
userRouter
  .route('/:userID?')
  .all((req: any, res: any, next: any) => {
    console.log(`> ${req.method} ${req.originalUrl}`)
    next()
  })
  .get((req: any, res: any, next: any) => {
    next(new HTTPErrror(405, 'Method not supported.'))
  })
  .put((req: any, res: any, next: any) => {
    next(new HTTPErrror(405, 'Method not supported.'))
  })
  .post((req: any, res: any, next: any) => {
    next(new HTTPErrror(405, 'Method not supported.'))
  })

app.use('/user', userRouter)

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
