import { PostRepository } from '../boundries/PostRepository'
import { UserRepository } from '../boundries/UserRepository'

export interface GetPostRequest {
  postID: string
}

export interface GetPostResponse {
  ID: string
  topic: string
  content: string
  user: {
    ID: string
    name: string
    email: string
  }
  metadata: {
    author: string
    url: string
  }
  createdAt: Date
  modifiedAt: Date
}

export interface Props {
  postRepository: PostRepository
  userRepository: UserRepository
}

export class GetPostUsecase {
  public constructor(props: Props) {
    this._props = props
  }

  public async execute(request: GetPostRequest): Promise<GetPostResponse> {
    const post = await this._props.postRepository.findById(request.postID)
    if (!post) {
      throw new Error(`Post with id '${request.postID}' not found.`)
    }

    const user = await this._props.userRepository.findById(post.userID)
    if (!user) {
      throw new Error(`User associated with post with id '${request.postID}' not found.`)
    }

    return {
      ID: post.ID,
      topic: post.topic,
      content: post.content,
      user: {
        ID: user.ID,
        name: user.name,
        email: user.email
      },
      metadata: post.metadata,
      createdAt: post.createdAt,
      modifiedAt: post.modifiedAt
    }
  }

  private _props: Props
}
