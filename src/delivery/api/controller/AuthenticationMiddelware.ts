import { AWS } from '../factory/AWSFactory'
import { DynamoUserRepository } from '../../../repository/DynamoUserRepository'
import { AuthenticationUsecase } from '../../../domain/usecases/AuthenticationUsecase'

export const AuthenticationMiddleware = async (req: any, res: any, next: any) => {
  try {
    const authorization = req.get('Authorization') ?? ''
    const part = authorization.split(' ').pop()

    let buff = Buffer.from(part, 'base64')
    let text = buff.toString('utf-8').split(':')
    let input = {
      email: text[0],
      password: text[1]
    }

    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const userRepository = new DynamoUserRepository(dynamoDB)
    const usecase = new AuthenticationUsecase({ userRepository })

    await usecase.execute(input)
    next()
  } catch (error) {
    console.log(`> ${error.message}`)
    res.status(403).json({
      status: 'error',
      statusCode: 403,
      message: error.message
    })
  }
}
