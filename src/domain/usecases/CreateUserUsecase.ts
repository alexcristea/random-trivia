import { User } from '../entities/User'
import { UserRepository } from '../boundries/UserRepository'

export interface CreateUserRequest {
  name: string
  email: string
  password: string
}

export interface Props {
  userRepository: UserRepository
}

export class CreateUserUsecase {
  public async execute(request: CreateUserRequest): Promise<User> {
    if (await this._userRepository.findByEmail(request.email)) {
      throw new Error(`User with email '${request.email}' exists.`)
    }

    const user = await User.create({ ...request })
    await this._userRepository.save(user)

    return user
  }

  public constructor(props: Props) {
    this._userRepository = props.userRepository
  }

  private _userRepository: UserRepository
}
