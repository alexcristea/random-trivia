import { AWS } from '../factory/AWSFactory'
import { DynamoPostRepository } from '../../../repository/DynamoPostRepository'
import { CreatePostUsecase } from '../../../domain/usecases/CreatePostUsecase'

export const CreatePostController = async (req: any, res: any, next: any) => {
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const postRepository = new DynamoPostRepository(dynamoDB)
    const usecase = new CreatePostUsecase({ postRepository })

    const request = {
      userID: req.auth.userID,
      ...req.body
    }
    await usecase.execute(request)
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
