import { v4 } from 'uuid'

export class UUID {
  static create() {
    return v4()
  }
}
