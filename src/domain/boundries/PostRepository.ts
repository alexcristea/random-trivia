import { Post } from '../entities/Post'

export interface PostRepository {
  save(post: Post): Promise<void>
}
