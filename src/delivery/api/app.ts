import { CreateUserController } from './controller/CreateUserController'
import { RouteUnavailableMiddleware } from './middleware/RouteUnavailableMiddleware'
import { ErrorHandlerMiddleware } from './middleware/ErrorHandlerMiddleware'
import { AuthenticationMiddleware } from './middleware/AuthenticationMiddelware'
import { GetUserController } from './controller/GetUserController'
import { CreatePostController } from './controller/CreatePostController'
import { GetPostController } from './controller/GetPostController'
import { ListPostsController } from './controller/ListPostsController'
import { DeletePostController } from './controller/DeletePostController'
import { UpdatePostController } from './controller/UpdatePostController'

const dotenv = require('dotenv')
dotenv.config()

const hostname = process.env.HOSTNAME ?? '127.0.0.1'
const port = parseInt(process.env.PORT ?? '3000')

const express = require('express')
const app = express()
app.use(express.json())

app.post('/users', CreateUserController)

app.use('/users/me', AuthenticationMiddleware)
app.get('/users/me', GetUserController)

app.use('/posts', AuthenticationMiddleware)
app.post('/posts', CreatePostController)
app.get('/posts', ListPostsController)
app.get('/posts/:postID', GetPostController)
app.put('/posts/:postID', UpdatePostController)
app.delete('/posts/:postID', DeletePostController)

app.use(RouteUnavailableMiddleware)
app.use(ErrorHandlerMiddleware)

app.listen(port, hostname, () => {
  console.log(`> Server running at http://${hostname}:${port}/`)
})
