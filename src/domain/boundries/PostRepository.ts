import { Post } from '../entities/Post'

export interface PostRepository {
  findById(id: string): Promise<Post | null>
  findAll(): Promise<Post[]>
  save(post: Post): Promise<void>
  update(post: Post): Promise<void>
  delete(post: Post): Promise<void>
}
