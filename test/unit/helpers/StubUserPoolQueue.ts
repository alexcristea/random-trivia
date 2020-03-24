import { User } from '../../../src/domain/entities/User'
import { UserPoolQueue } from '../../../src/domain/boundries/UserPoolQueue'

export class StubUserPoolQueue implements UserPoolQueue {
  public get queuedNewUser(): User {
    return this._queuedNewUser
  }

  public async queue(user: User) {
    this._queuedNewUser = user
  }

  private _queuedNewUser: User
}
