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
      email: text[0] ?? '',
      password: text[1] ?? ''
    }

    // TODO: Improve validation
    if (input.email == '' || input.password == '') {
      throw new Error('Unauthorized.')
    }

    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const userRepository = new DynamoUserRepository(dynamoDB)
    const usecase = new AuthenticationUsecase({ userRepository })

    const user = await usecase.execute(input)
    req.auth = {
      userID: user.ID
    }

    next()
  } catch (error) {
    console.log(`> ${error.message}`)
    res
      .set('WWW-Authenticate', 'Basic, charset=utf-8')
      .status(401)
      .json({
        status: 'error',
        statusCode: 401,
        message: error.message
      })
  }
}
