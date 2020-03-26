import { User } from '../entities/User'

export interface UserPoolQueue {
  queue(user: User): Promise<void>
}
