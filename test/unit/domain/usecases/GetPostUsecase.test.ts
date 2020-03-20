import { Post } from '../../../../src/domain/entities/Post'
import { GetPostUsecase } from '../../../../src/domain/usecases/GetPostUsecase'
import { StubPostRepository } from '../../helpers/StubPostRepository'
import { User } from '../../../../src/domain/entities/User'
import { StubUserRepository } from '../../helpers/StubUserRepository'

describe('GetPostUsecase execute', () => {
  test('should return an Error when the post id is not valid', async () => {
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
    const request = {
      postID: 'invalidPostID',
      userID: 'userID'
    }
    const userRepository = new StubUserRepository()
    const postRepository = new StubPostRepository()
    postRepository.save(post)

    const sut = new GetPostUsecase({ postRepository, userRepository })

    // Act
    try {
      await sut.execute(request)
      fail()
    } catch (error) {
      expect(error).toEqual(new Error(`Post with id '${request.postID}' not found.`))
    }
  })

  test('should return an Error when the user associayed with the post is not valid', async () => {
    // Arrange
    const postSnapshot = {
      ID: 'postID',
      userID: 'invalidUserID',
      topic: 'topic',
      content: 'content',
      metadata: {
        author: 'author',
        url: 'url'
      },
      createdAt: 0,
      modifiedAt: 0
    }
    const post = Post.fromSnapshot(postSnapshot)

    const userRepository = new StubUserRepository()
    const postRepository = new StubPostRepository()
    postRepository.save(post)

    const request = {
      postID: 'postID'
    }

    const sut = new GetPostUsecase({ postRepository, userRepository })

    // Act
    try {
      await sut.execute(request)
      fail()
    } catch (error) {
      expect(error).toEqual(new Error(`User associated with post with id '${request.postID}' not found.`))
    }
  })

  test('should return an the post with user details when the post id is valid', async () => {
    // Arrange
    const postSnapshot = {
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
    const post = Post.fromSnapshot(postSnapshot)

    const userSnapshot = {
      ID: 'userID',
      name: 'name',
      email: 'email',
      password: '',
      createdAt: 0,
      modifiedAt: 0
    }
    const user = User.fromSnapshot(userSnapshot)
    const userRepository = new StubUserRepository(user)

    const postRepository = new StubPostRepository()
    postRepository.save(post)

    const request = {
      postID: 'postID'
    }

    const sut = new GetPostUsecase({ postRepository, userRepository })

    // Act
    const result = await sut.execute(request)

    // Assert
    expect(result).toEqual({
      ID: post.ID,
      topic: post.topic,
      content: post.content,
      user: {
        ID: user.ID,
        name: user.name,
        email: user.email
      },
      metadata: post.metadata,
      createdAt: post.createdAt,
      modifiedAt: post.modifiedAt
    })
  })
})
