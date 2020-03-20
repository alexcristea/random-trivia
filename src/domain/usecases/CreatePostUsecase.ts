import { Post } from '../entities/Post'
import { PostRepository } from '../boundries/PostRepository'

export interface CreatePostRequest {
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

export class CreatePostUsecase {
  public constructor(props: Props) {
    this._repo = props.postRepository
  }

  public async execute(request: CreatePostRequest): Promise<Post> {
    const post = Post.create(request)
    this._repo.save(post)

    return post
  }

  private _repo: PostRepository
}
