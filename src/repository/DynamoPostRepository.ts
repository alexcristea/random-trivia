import { PostRepository } from '../domain/boundries/PostRepository'
import { Post } from '../domain/entities/Post'

export class DynamoPostRepository implements PostRepository {
  private dynamodb: any
  private tableName = 'Posts'

  public constructor(dynomoDB: any) {
    this.dynamodb = dynomoDB
  }

  public async findById(id: string): Promise<Post | null> {
    const query = {
      ExpressionAttributeValues: {
        ':id': id
      },
      KeyConditionExpression: 'ID = :id',
      TableName: this.tableName
    }

    const results = await this.dynamodb.query(query).promise()
    if (results.Count == 0) {
      return null
    }

    const snapshot = results.Items[0]
    return Post.fromSnapshot(snapshot)
  }

  public async findAll(): Promise<Post[]> {
    const query = {
      TableName: this.tableName
    }

    const results = await this.dynamodb.scan(query).promise()
    return results.Items.map((snapshot: any) => Post.fromSnapshot(snapshot))
  }

  public async save(post: Post) {
    var params = {
      Item: post.snapshot,
      TableName: this.tableName
    }
    await this.dynamodb.put(params).promise()
  }
}
