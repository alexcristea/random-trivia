import { CreateUserUsecase, CreateUserRequest } from '../../../../src/domain/usecases/CreateUserUsecase'
import { StubUserRepository } from '../../helpers/StubUserRepository'
import { User } from '../../../../src/domain/entities/User'

var MockDate = require('mockdate')

describe('CreateUserUsecase execute', () => {
  beforeEach(() => {
    MockDate.set('2020-12-12')
  })

  afterEach(() => {
    MockDate.reset()
  })

  // Arrange
  const fakeDate = new Date('2020-12-12')
  const request: CreateUserRequest = {
    name: 'Jhon Appleseed',
    email: 'jhon.appleseed@example.com',
    password: 'secret'
  }

  test('should return a User instance when called with a valid CreateUserRequest', async () => {
    // Arrange
    const userRepository = new StubUserRepository()
    const sut = new CreateUserUsecase({ userRepository })

    // Act
    const response = await sut.execute(request)

    // Assert
    // TODO: Cover the id
    // TODO: Cover the encripted password
    expect(response.name).toEqual(request.name)
    expect(response.email).toEqual(request.email)
    expect(response.createdAt).toEqual(fakeDate)
    expect(response.modifiedAt).toEqual(fakeDate)
  })

  test('should return a User instance when the email does not exist in the system', async () => {
    // Arrange
    const userRepository = new StubUserRepository()
    const sut = new CreateUserUsecase({ userRepository })

    // Act
    const response = await sut.execute(request)

    // Assert
    expect(response).toBeInstanceOf(User)
  })

  test('should return an Error when the email exists in the system', async () => {
    // Arrange
    const validUser = await User.create({
      name: 'Jhon Appleseed',
      email: 'jhon.appleseed@example.com',
      password: 'secret'
    })
    const userRepository = new StubUserRepository(validUser)
    const sut = new CreateUserUsecase({ userRepository })

    try {
      // Act
      await sut.execute(request)
      fail()
    } catch (error) {
      // Assert
      expect(error).toEqual(new Error(`User with email '${request.email}' exists.`))
    }
  })

  test('should save the User instance into the UserRepository', async () => {
    // Arrange
    const userRepository = new StubUserRepository()
    const sut = new CreateUserUsecase({ userRepository })

    // Act
    let actual = await sut.execute(request)

    // Assert
    expect(userRepository.savedUser).toBe(actual)
  })
})
