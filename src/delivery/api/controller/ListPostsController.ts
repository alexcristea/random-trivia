import { AWS } from '../factory/AWSFactory'
import { DynamoPostRepository } from '../../../repository/DynamoPostRepository'
import { ListPostsUsecase } from '../../../domain/usecases/ListPostsUsecase'

export const ListPostsController = async (req: any, res: any, next: any) => {
  console.log(`> ${req.auth}`)
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const postRepository = new DynamoPostRepository(dynamoDB)
    const usecase = new ListPostsUsecase({ postRepository })

    const posts = await usecase.execute()
    res.status(200).send(posts)
  } catch (error) {
    console.log(`> ${error.message}`)
    res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: error.message
    })
  }
}
