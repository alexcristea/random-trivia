import { UserRepository } from '../../../src/domain/boundries/UserRepository'
import { User } from '../../../src/domain/entities/User'

export class StubUserRepository implements UserRepository {
  public savedUser: User

  constructor(result?: any) {
    this._result = result
  }

  async findByEmail(email: string) {
    return this._result
  }

  async save(user: User) {
    this.savedUser = user
  }

  private _result?: any
}
