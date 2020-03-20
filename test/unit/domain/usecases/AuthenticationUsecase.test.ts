import { AuthenticationUsecase, AuthenticationRequest } from '../../../../src/domain/usecases/AuthenticationUsecase'
import { StubUserRepository } from '../../helpers/StubUserRepository'
import { User } from '../../../../src/domain/entities/User'

describe('AuthenticationUsecase execute', () => {
  // Arrange
  const request: AuthenticationRequest = {
    email: 'jhon.appleseed@example.com',
    password: 'secret'
  }

  test('should return a User when called with a valid AuthenticationRequest', async () => {
    // Arrange
    const validUser = await User.create({
      name: 'Jhon Appleseed',
      email: 'jhon.appleseed@example.com',
      password: 'secret'
    })
    const userRepository = new StubUserRepository(validUser)
    const sut = new AuthenticationUsecase({ userRepository })

    // Act
    const response = await sut.execute(request)

    // Assert
    expect(response).toBe(validUser)
  })

  test('should return an Error when the email doesnt exist', async () => {
    // Arrange
    const userRepository = new StubUserRepository()
    const sut = new AuthenticationUsecase({ userRepository })

    try {
      // Act
      await sut.execute(request)
      fail()
    } catch (error) {
      // Assert
      expect(error).toEqual(new Error(`No account registered with email '${request.email}'.`))
    }
  })

  test('should return an Error when the password is invalid', async () => {
    // Arrange
    const invalidUser = await User.create({
      name: 'Jhon Appleseed',
      email: 'jhon.appleseed@example.com',
      password: 'invalid_password'
    })
    const userRepository = new StubUserRepository(invalidUser)
    const sut = new AuthenticationUsecase({ userRepository })

    try {
      // Act
      await sut.execute(request)
      fail()
    } catch (error) {
      // Assert
      expect(error).toEqual(new Error(`Invalid password for account registered with email '${request.email}'.`))
    }
  })
})
