import { AWS } from '../factory/AWSFactory'
import { DynamoUserRepository } from '../../../repository/DynamoUserRepository'
import { GetPostUsecase } from '../../../domain/usecases/GetPostUsecase'
import { DynamoPostRepository } from '../../../repository/DynamoPostRepository'

export const GetPostController = async (req: any, res: any, next: any) => {
  console.log(`> ${req.auth}`)
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const userRepository = new DynamoUserRepository(dynamoDB)
    const postRepository = new DynamoPostRepository(dynamoDB)
    const usecase = new GetPostUsecase({ postRepository, userRepository })

    const post = await usecase.execute({ postID: req.params.postID })
    res.status(200).send(post)
  } catch (error) {
    console.log(`> ${error.message}`)
    res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: error.message
    })
  }
}
