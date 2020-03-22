import { AWS } from '../factory/AWSFactory'
import { DynamoPostRepository } from '../../../repository/DynamoPostRepository'
import { DeletePostUsecase } from '../../../domain/usecases/DeletePostUsecase'

export const DeletePostController = async (req: any, res: any, next: any) => {
  console.log(`> ${req.auth}`)
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const postRepository = new DynamoPostRepository(dynamoDB)
    const usecase = new DeletePostUsecase({ postRepository })

    await usecase.execute({ postID: req.params.postID, userID: req.auth.userID })
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
