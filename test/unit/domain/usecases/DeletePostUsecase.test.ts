import { Post } from '../../../../src/domain/entities/Post'
import { StubPostRepository } from '../../helpers/StubPostRepository'
import { DeletePostUsecase } from '../../../../src/domain/usecases/DeletePostUsecase'

describe('GetPostUsecase execute', () => {
  test('should return an Error when the post id is not valid', async () => {
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

    const postRepository = new StubPostRepository()
    postRepository.save(post)

    const request = {
      postID: 'anotherPostID',
      userID: 'anotherUserID'
    }

    const sut = new DeletePostUsecase({ postRepository })

    // Act
    try {
      await sut.execute(request)
      fail()
    } catch (error) {
      expect(error).toEqual(new Error(`Post with id '${request.postID}' not found.`))
    }
  })

  test('should return an Error when the user is not allowed to delete the post', async () => {
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

    const postRepository = new StubPostRepository()
    postRepository.save(post)

    const request = {
      postID: 'postID',
      userID: 'anotherUserID'
    }

    const sut = new DeletePostUsecase({ postRepository })

    // Act
    try {
      await sut.execute(request)
      fail()
    } catch (error) {
      expect(error).toEqual(
        new Error(`User with id '${request.userID} cannot delete post with id '${request.postID}' not found.`)
      )
    }
  })

  test('should ask the repository to delete the post when id is valid', async () => {
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

    const postRepository = new StubPostRepository()
    postRepository.save(post)

    const request = {
      postID: 'postID',
      userID: 'userID'
    }

    const sut = new DeletePostUsecase({ postRepository })

    // Act
    await sut.execute(request)

    // Assert
    expect(postRepository.deletedPost)
  })
})
