import { Post } from '../../../../src/domain/entities/Post'
import { StubPostRepository } from '../../helpers/StubPostRepository'
import { ListPoststUsecase } from '../../../../src/domain/usecases/ListPoststUsecase'

describe('ListPoststUsecase execute', () => {
  test('should return empty array if there are no posts in the system', async () => {
    // Arrange
    const postRepository = new StubPostRepository()

    const sut = new ListPoststUsecase({ postRepository })

    // Act
    const result = await sut.execute()

    // Assert
    expect(result).toEqual([])
  })

  test('should list all the posts in the system', async () => {
    // Arrange
    const snapshot = {
      ID: 'postID',
      userID: 'userID',
      topic: 'topic',
      content: 'content',
      metadata: {
        author: 'author',
        url: 'url'
      },
      createdAt: 0,
      modifiedAt: 0
    }
    const post = Post.fromSnapshot(snapshot)
    const postRepository = new StubPostRepository()
    postRepository.save(post)

    const sut = new ListPoststUsecase({ postRepository })

    // Act
    const result = await sut.execute()

    // Assert
    expect(result).toEqual([
      {
        ID: post.ID,
        topic: post.topic,
        excerpt: post.content.substring(0, 20) + ' ...',
        createdAt: post.createdAt
      }
    ])
  })
})
