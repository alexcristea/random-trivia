import { PostRepository } from '../boundries/PostRepository'

export interface ListPostsResponse {
  ID: string
  topic: string
  excerpt: string
  createdAt: Date
}

export interface Props {
  postRepository: PostRepository
}

export class ListPostsUsecase {
  public constructor(props: Props) {
    this._props = props
  }

  public async execute(): Promise<ListPostsResponse[]> {
    const posts = await this._props.postRepository.findAll()
    return posts.map(post => ({
      ID: post.ID,
      topic: post.topic,
      excerpt: post.content.substring(0, 20) + ' ...',
      createdAt: post.createdAt
    }))
  }

  private _props: Props
}
