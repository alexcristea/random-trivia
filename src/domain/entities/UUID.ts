const uuid = require('uuid')

export class UUID {
  static create() {
    return uuid.v4()
  }
}
