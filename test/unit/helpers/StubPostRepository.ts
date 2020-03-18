import { Post } from '../../../src/domain/entities/Post'

export class StubPostRepository {
  public get savedPost(): Post {
    return this._savedPost
  }

  public async save(user: Post) {
    this._savedPost = user
  }

  private _savedPost: Post
}
