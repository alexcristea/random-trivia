import { CreatePostUsecase } from '../../../../src/domain/usecases/CreatePostUsecase'
import { Post } from '../../../../src/domain/entities/Post'
import { StubPostRepository } from '../../helpers/StubPostRepository'

describe('CreatePostUsecase execute', () => {
  // Arrange
  const request = {
    userID: 'userID',
    topic: 'topic',
    content: 'content',
    metadata: {
      url: 'http://google.com',
      author: 'author'
    }
  }

  test('should return a post object when called with a valid CreatePostRequest', async () => {
    // Arrange
    const repo = new StubPostRepository()
    const sut = new CreatePostUsecase({ postRepository: repo })

    // Act
    const response = await sut.execute(request)

    // Assert
    expect(response).toBeInstanceOf(Post)
  })

  test('should save the Post into the repository', async () => {
    // Arrange
    const repo = new StubPostRepository()
    const sut = new CreatePostUsecase({ postRepository: repo })

    // Act
    const result = await sut.execute(request)

    // Assert
    expect(repo.savedPost).toBe(result)
  })
})
