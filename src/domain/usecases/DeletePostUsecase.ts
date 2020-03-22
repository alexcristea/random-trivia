import { PostRepository } from '../boundries/PostRepository'

export interface DeleteUserRequest {
  postID: string
  userID: string
}

export interface Props {
  postRepository: PostRepository
}

export class DeletePostUsecase {
  public constructor(props: Props) {
    this._props = props
  }

  public async execute(request: DeleteUserRequest): Promise<void> {
    const post = await this._props.postRepository.findById(request.postID)
    if (!post) {
      throw new Error(`Post with id '${request.postID}' not found.`)
    }

    if (post.userID != request.userID) {
      throw new Error(`User with id '${request.userID} cannot delete post with id '${request.postID}' not found.`)
    }

    await this._props.postRepository.delete(post)
  }

  private _props: Props
}
