import { PostRepository } from '../boundries/PostRepository'

export interface UpdatePostRequest {
  postID: string
  userID: string
  topic: string
  content: string
  metadata: {
    url: string
    author: string
  }
}

export interface Props {
  postRepository: PostRepository
}

export class UpdatePostUsecase {
  public constructor(props: Props) {
    this._props = props
  }

  public async execute(request: UpdatePostRequest): Promise<void> {
    const post = await this._props.postRepository.findById(request.postID)
    if (!post) {
      throw new Error(`Post with id '${request.postID}' not found.`)
    }

    if (post.userID != request.userID) {
      throw new Error(`User with id '${request.userID} cannot update post with id '${request.postID}' not found.`)
    }

    await this._props.postRepository.update(post)
  }

  private _props: Props
}
