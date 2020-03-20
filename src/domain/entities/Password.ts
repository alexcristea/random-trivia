const bcrypt = require('bcrypt')

export class Password {
  public static async create(password: string) {
    return await bcrypt.hash(password, 10)
  }
}
