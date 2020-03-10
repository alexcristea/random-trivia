import { User } from '../../../../src/domain/entities/User'
const bcrypt = require('bcrypt')

describe('User create method', () => {
  // Arrange
  const props = {
    name: 'Jhon Appleseed',
    email: 'jhon.appleseed@example.com',
    password: 'secure'
  }

  test('should contain a generated uniq UUID when called valid props', async () => {
    // Act
    const sutA = await User.create(props)
    const sutB = await User.create(props)

    // Assert
    expect(sutA.ID).not.toEqual(sutB.ID)
  })

  test('should contain the name when called with valid props', async () => {
    // Act
    const sut = await User.create(props)

    // Assert
    expect(sut.name).toEqual(props.name)
  })

  test('should contain the email when called with valid props', async () => {
    // Act
    const sut = await User.create(props)

    // Assert
    expect(sut.email).toEqual(props.email)
  })

  test('should contain the password hashed with bcrypt when called with valid props', async () => {
    // Act
    const sut = await User.create(props)

    // Assert
    let isValidPassword = await bcrypt.compare(props.password, sut.password)
    expect(isValidPassword).toBeTruthy()
  })

  test('should contain the created date when called with valid props', async () => {
    // Act
    const sut = await User.create(props)

    // Assert
    const expected = new Date()
    expect(sut.createdAt).toEqual(expected)
  })

  test('should contain the modified date when called with valid props', async () => {
    // Act
    const sut = await User.create(props)

    // Assert
    const expected = new Date()
    expect(sut.modifiedAt).toEqual(expected)
    expect(sut.modifiedAt).toEqual(sut.createdAt)
  })
})
