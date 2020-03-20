import { Post } from '../entities/Post'

export interface PostRepository {
  findById(id: string): Promise<Post | null>
  save(post: Post): Promise<void>
}
