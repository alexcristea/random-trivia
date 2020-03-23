import { Post } from '../../../src/domain/entities/Post'
import { PostRepository } from '../../../src/domain/boundries/PostRepository'

export class StubPostRepository implements PostRepository {
  public get savedPost(): Post {
    return this._savedPost
  }

  public get updatedPost(): Post {
    return this._updatedPost
  }

  public get deletedPost(): Post {
    return this._deletedPost
  }

  public async findById(id: string): Promise<Post | null> {
    if (this._savedPost.ID == id) {
      return this.savedPost
    }

    return null
  }

  public async findAll(): Promise<Post[]> {
    if (this._savedPost) {
      return [this.savedPost]
    }
    return []
  }

  public async save(post: Post) {
    this._savedPost = post
  }

  public async update(post: Post): Promise<void> {
    this._updatedPost = post
  }

  public async delete(post: Post) {
    this._deletedPost = post
  }

  private _savedPost: Post
  private _updatedPost: Post
  private _deletedPost: Post
}
