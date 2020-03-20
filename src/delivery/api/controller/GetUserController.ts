import { AWS } from '../factory/AWSFactory'
import { DynamoUserRepository } from '../../../repository/DynamoUserRepository'
import { GetUserUsecase } from '../../../domain/usecases/GetUserUsecase'

export const GetUserController = async (req: any, res: any, next: any) => {
  console.log(`> ${req.auth}`)
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const userRepository = new DynamoUserRepository(dynamoDB)
    const usecase = new GetUserUsecase({ userRepository })

    const user = await usecase.execute({ id: req.auth.userID })
    res.status(200).send(user)
  } catch (error) {
    console.log(`> ${error.message}`)
    res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: error.message
    })
  }
}
