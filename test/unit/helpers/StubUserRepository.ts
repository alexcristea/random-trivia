import { UserRepository } from '../../../src/domain/boundries/UserRepository'
import { User } from '../../../src/domain/entities/User'

export class StubUserRepository implements UserRepository {
  public get savedUser(): User {
    return this._savedUser
  }

  constructor(result?: User) {
    this._findByEmailResult = result ?? null
  }

  async findByEmail(email: string) {
    return this._findByEmailResult
  }

  async save(user: User) {
    this._savedUser = user
  }

  private _findByEmailResult: User | null
  private _savedUser: User
}
