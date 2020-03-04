import { UserRepository } from '../domain/boundries/UserRepository'
import { User } from '../domain/entities/User'
const AWS = require('aws-sdk')
AWS.config.update({
  region: 'eu-west-1',
  accessKeyId: 'ACCESS_KEY_ID',
  secretAccessKey: 'SECRET_KEY_ID'
})

export class DynamoUserRepository implements UserRepository {
  private dynamodb = new AWS.DynamoDB.DocumentClient()
  private tableName = 'users'
  private indexName = 'email-index'

  async findByEmail(email: string) {
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
    return new User({
      name: snapshot.name,
      email: snapshot.email,
      password: snapshot.password
    })
  }

  async save(user: User) {
    var params = {
      Item: user.snapshot,
      TableName: this.tableName
    }
    await this.dynamodb.put(params).promise()
  }
}
