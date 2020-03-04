import { User } from '../entities/User'

export interface UserRepository {
  findByEmail(email: string): Promise<User>
  save(user: User): Promise<void>
}
