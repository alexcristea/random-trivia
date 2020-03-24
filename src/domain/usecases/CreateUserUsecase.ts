import { User } from '../entities/User'
import { UserRepository } from '../boundries/UserRepository'
import { UserPoolQueue } from '../boundries/UserPoolQueue'

export interface CreateUserRequest {
  name: string
  email: string
  password: string
}

export interface Props {
  userRepository: UserRepository
  userPoolQueue: UserPoolQueue
}

export class CreateUserUsecase {
  public async execute(request: CreateUserRequest): Promise<User> {
    if (await this._props.userRepository.findByEmail(request.email)) {
      throw new Error(`User with email '${request.email}' exists.`)
    }

    const user = await User.create({ ...request })
    await this._props.userRepository.save(user)
    await this._props.userPoolQueue.queue(user)

    return user
  }

  public constructor(props: Props) {
    this._props = props
  }

  private _props: Props
}
