import { CreateUserUsecase, CreateUserRequest } from '../../../../src/domain/usecases/CreateUserUsecase'
import { StubUserRepository } from '../../helpers/StubUserRepository'
import { User } from '../../../../src/domain/entities/User'
import { UUID } from '../../../../src/domain/entities/UUID'
import { Password } from '../../../../src/domain/entities/Password'

var MockDate = require('mockdate')

var OriginalUUID: any
var OriginalPassword: any

describe('CreateUserUsecase execute', () => {
  beforeEach(() => {
    MockDate.set('2020-12-12')

    OriginalUUID = UUID.create
    OriginalPassword = Password.create
    UUID.create = () => 'fake-uuid'
    Password.create = async () => 'fake-password'
  })

  afterEach(() => {
    MockDate.reset()

    UUID.create = OriginalUUID
    Password.create = OriginalPassword
  })

  // Arrange
  const fakePassword = 'fake-password'
  const fakeUUID = 'fake-uuid'
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
    expect(response.ID).toEqual(fakeUUID)
    expect(response.password).toEqual(fakePassword)
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
