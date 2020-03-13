import { UserRepository } from '../boundries/UserRepository'

export interface GetUserRequest {
  id: string
}

export interface GetUserResponse {
  name: string
  email: string
  createdAt: Date
  modifiedAt: Date
}

export interface Props {
  userRepository: UserRepository
}

export class GetUserUsecase {
  public constructor(props: Props) {
    this._repo = props.userRepository
  }

  public async execute(request: GetUserRequest): Promise<GetUserResponse> {
    const user = await this._repo.findById(request.id)!
    if (!user) {
      throw new Error(`No user registered with id '${request.id}'.`)
    }

    return {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      modifiedAt: user.modifiedAt
    }
  }

  private _repo: UserRepository
}
