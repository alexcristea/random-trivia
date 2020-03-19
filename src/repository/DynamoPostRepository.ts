import { PostRepository } from '../domain/boundries/PostRepository'
import { Post } from '../domain/entities/Post'

export class DynamoPostRepository implements PostRepository {
  private dynamodb: any
  private tableName = 'Posts'

  constructor(dynomoDB: any) {
    this.dynamodb = dynomoDB
  }
  async save(post: Post) {
    var params = {
      Item: post.snapshot,
      TableName: this.tableName
    }
    await this.dynamodb.put(params).promise()
  }
}
