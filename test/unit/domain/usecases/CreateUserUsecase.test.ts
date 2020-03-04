import { CreateUserUsecase, CreateUserRequest } from '../../../../src/domain/usecases/CreateUserUsecase'
import { StubUserRepository } from '../../helpers/StubUserRepository'
import { User } from '../../../../src/domain/entities/User'

describe('CreateUserUsecase execute', () => {
  // Arrange
  const request: CreateUserRequest = {
    name: 'Jhon Appleseed',
    email: 'jhon.appleseed@example.com',
    password: 'secret'
  }

  test('should return a CreateUserResult when called with a valid CreateUserRequest', async () => {
    // Arrange
    const userRepository = new StubUserRepository()
    const sut = new CreateUserUsecase({ userRepository })

    // Act
    const response = await sut.execute(request)

    // Assert
    expect(response).toEqual({})
  })

  test('should return a CreateUserResult when the email is uniq', async () => {
    // Arrange
    const userRepository = new StubUserRepository()
    const sut = new CreateUserUsecase({ userRepository })

    // Act
    const response = await sut.execute(request)

    // Assert
    expect(response).toEqual({})
  })

  test('should return an Error when the email exists', async () => {
    // Arrange
    const userRepository = new StubUserRepository({ email: 'jhon.appleseed@example.com' })
    const sut = new CreateUserUsecase({ userRepository })

    try {
      // Act
      await sut.execute(request)
    } catch (error) {
      // Assert
      expect(error).toEqual(new Error(`User with email '${request.email}' exists.`))
    }
  })

  // test('should create and save a User into the UserRepository', async () => {
  //   // Arrange
  //   const userRepository = new StubUserRepository()
  //   const sut = new CreateUserUsecase({ userRepository })

  //   // Act
  //   await sut.execute(request)

  //   // Assert
  //   expect(userRepository.savedUser).toEqual(new User({ ...request }))
  // })
})
