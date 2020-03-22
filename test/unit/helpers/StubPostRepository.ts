import { Post } from '../../../src/domain/entities/Post'
import { PostRepository } from '../../../src/domain/boundries/PostRepository'

export class StubPostRepository implements PostRepository {
  public get savedPost(): Post {
    return this._savedPost
  }

  async findById(id: string): Promise<Post | null> {
    if (this._savedPost.ID == id) {
      return this.savedPost
    }

    return null
  }

  async findAll(): Promise<Post[]> {
    if (this._savedPost) {
      return [this.savedPost]
    }
    return []
  }

  public async save(user: Post) {
    this._savedPost = user
  }

  private _savedPost: Post
}
