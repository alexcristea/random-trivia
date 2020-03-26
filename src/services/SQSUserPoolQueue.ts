import { UserPoolQueue } from '../domain/boundries/UserPoolQueue'
import { User } from '../domain/entities/User'

export class SQSUserPoolQueue implements UserPoolQueue {
  public constructor(sqs: any) {
    this._sqs = sqs
  }

  public async queue(user: User): Promise<void> {
    var body = { ...user.snapshot }
    delete body.password

    var params = {
      DelaySeconds: 10,
      MessageAttributes: {
        type: {
          DataType: 'String',
          StringValue: this._type
        }
      },
      MessageBody: JSON.stringify(body),
      QueueUrl: this._url
    }

    await this._sqs.sendMessage(params).promise()
  }

  private _type = 'NEW_USER_POOL'
  private _url = 'https://sqs.eu-west-1.amazonaws.com/523903436223/user-pool-queue'
  private _sqs: any
}
