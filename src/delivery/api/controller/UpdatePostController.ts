import { AWS } from '../factory/AWSFactory'
import { DynamoPostRepository } from '../../../repository/DynamoPostRepository'
import { UpdatePostUsecase } from '../../../domain/usecases/UpdatePostUsecase'

export const UpdatePostController = async (req: any, res: any, next: any) => {
  console.log(`> ${req.auth}`)
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const postRepository = new DynamoPostRepository(dynamoDB)
    const usecase = new UpdatePostUsecase({ postRepository })

    await usecase.execute({ postID: req.params.postID, userID: req.auth.userID, ...req.body })
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
