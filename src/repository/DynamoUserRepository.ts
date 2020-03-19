import { UserRepository } from '../domain/boundries/UserRepository'
import { User } from '../domain/entities/User'

export class DynamoUserRepository implements UserRepository {
  private dynamodb: any
  private tableName = 'Users'
  private indexName = 'email-index'

  public constructor(dynomoDB: any) {
    this.dynamodb = dynomoDB
  }

  public async findById(id: string) {
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
    return User.fromSnapshot(snapshot)
  }

  public async findByEmail(email: string) {
    const query = {
      ExpressionAttributeValues: {
        ':e': email
      },
      KeyConditionExpression: 'email = :e',
      TableName: this.tableName,
      IndexName: this.indexName
    }

    const results = await this.dynamodb.query(query).promise()
    if (results.Count == 0) {
      return null
    }

    const snapshot = results.Items[0]
    return User.fromSnapshot(snapshot)
  }

  public async save(user: User) {
    var params = {
      Item: user.snapshot,
      TableName: this.tableName
    }
    await this.dynamodb.put(params).promise()
  }
}
