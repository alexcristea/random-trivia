import { CreatePostUsecase } from '../../../../src/domain/usecases/CreatePostUsecase'
import { Post } from '../../../../src/domain/entities/Post'
import { StubPostRepository } from '../../helpers/StubPostRepository'

var MockDate = require('mockdate')

describe('CreatePostUsecase execute', () => {
  beforeEach(() => {
    MockDate.set('2020-12-12')
  })

  afterEach(() => {
    MockDate.reset()
  })

  // Arrange
  const fakeDate = new Date('2020-12-12')
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
    // TODO: Cover the id
    expect(response.userID).toEqual(request.userID)
    expect(response.topic).toEqual(request.topic)
    expect(response.content).toEqual(request.content)
    expect(response.metadata).toEqual(request.metadata)
    expect(response.createdAt).toEqual(fakeDate)
    expect(response.modifiedAt).toEqual(fakeDate)
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
