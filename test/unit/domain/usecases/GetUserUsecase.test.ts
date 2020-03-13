import { GetUserRequest, GetUserUsecase } from '../../../../src/domain/usecases/GetUserUsecase'
import { User, Snapshot } from '../../../../src/domain/entities/User'
import { StubUserRepository } from '../../helpers/StubUserRepository'
import { AuthenticationUsecase } from '../../../../src/domain/usecases/AuthenticationUsecase'

describe('GetUserUsecase execute', () => {
  test('should return a User when called with a valid AuthenticationRequest', async () => {
    // Arrange
    const snapshot: Snapshot = {
      ID: 'userID',
      name: 'name',
      email: 'email',
      password: '',
      createdAt: 0,
      modifiedAt: 0
    }
    const validUser = User.fromSnapshot(snapshot)
    const userRepository = new StubUserRepository(validUser)
    const sut = new GetUserUsecase({ userRepository })

    const request: GetUserRequest = {
      id: 'userID'
    }

    // Act
    const response = await sut.execute(request)

    // Assert
    expect(response).toEqual({
      name: 'name',
      email: 'email',
      createdAt: new Date(0),
      modifiedAt: new Date(0)
    })
  })

  test('should return an Error when the email doesnt exist', async () => {
    // Arrange
    const userRepository = new StubUserRepository()
    const sut = new GetUserUsecase({ userRepository })

    const request: GetUserRequest = {
      id: 'userID'
    }

    try {
      // Act
      await sut.execute(request)
      fail()
    } catch (error) {
      // Assert
      expect(error).toEqual(new Error(`No user registered with id '${request.id}'.`))
    }
  })
})
