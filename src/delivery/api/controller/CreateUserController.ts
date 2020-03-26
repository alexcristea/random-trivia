import { AWS } from '../factory/AWSFactory'
import { DynamoUserRepository } from '../../../repository/DynamoUserRepository'
import { CreateUserUsecase } from '../../../domain/usecases/CreateUserUsecase'
import { SQSUserPoolQueue } from '../../../services/SQSUserPoolQueue'

export const CreateUserController = async (req: any, res: any, next: any) => {
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const userRepository = new DynamoUserRepository(dynamoDB)

    const sqs = new AWS.SQS({ apiVersion: '2012-11-05' })
    const userPoolQueue = new SQSUserPoolQueue(sqs)
    const usecase = new CreateUserUsecase({ userRepository, userPoolQueue })

    await usecase.execute(req.body)
    res.status(204).send()
  } catch (error) {
    console.log(`> ${error.message}`)
    res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: error.message
    })
  }
}
