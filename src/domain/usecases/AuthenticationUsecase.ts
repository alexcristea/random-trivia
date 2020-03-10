import { User } from '../entities/User'
import { UserRepository } from '../boundries/UserRepository'

export interface AuthenticationRequest {
  email: string
  password: string
}

export interface Props {
  userRepository: UserRepository
}

export class AuthenticationUsecase {
  public async execute(request: AuthenticationRequest): Promise<User> {
    const user = await this._userRepository.findByEmail(request.email)
    if (!user) {
      throw new Error(`No account registered with email '${request.email}'.`)
    }

    const validPassword = await user.checkPassword(request.password)
    if (!validPassword) {
      throw new Error(`Invalid password for account registered with email '${request.email}'.`)
    }

    return user
  }

  public constructor(props: Props) {
    this._userRepository = props.userRepository
  }

  private _userRepository: UserRepository
}
