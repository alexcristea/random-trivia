import sayHello from '../../domain/hello-world'

const dotenv = require('dotenv')
dotenv.config()

const hostname = process.env.HOSTNAME ?? '127.0.0.1'
const port = parseInt(process.env.PORT ?? '3000')

const express = require('express')
const app = express()
app.use(express.json())
app.use((err: any, req: any, res: any, next: any) => {
  const { message, statusCode } = err

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  })
})

app.post('/', (req: any, res: any) => {
  let output = sayHello(req.body)
  res
    .set('Content-Type', 'application/json')
    .status(200)
    .json(output)
})

app.listen(port, () => {
  console.log(`> Server running at http://${hostname}:${port}/`)
})
