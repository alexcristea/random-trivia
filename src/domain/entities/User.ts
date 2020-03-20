import { UUID } from './UUID'
import { Password } from './Password'

const bcrypt = require('bcrypt')

interface UserProps {
  ID: string
  name: string
  email: string
  password: string
  createdAt: Date
  modifiedAt: Date
}

export interface CreateProps {
  name: string
  email: string
  password: string
}

export interface Snapshot {
  ID: string
  name: string
  email: string
  password: string
  createdAt: number
  modifiedAt: number
}

export class User {
  public static async create(props: CreateProps) {
    const password = await Password.create(props.password)
    const now = new Date()

    const userProps = {
      ID: UUID.create(),
      name: props.name,
      email: props.email,
      password: password,
      createdAt: now,
      modifiedAt: now
    }
    return new User(userProps)
  }

  public static fromSnapshot(snapshot: Snapshot) {
    return new User({
      ID: snapshot.ID,
      name: snapshot.name,
      email: snapshot.email,
      password: snapshot.password,
      createdAt: new Date(snapshot.createdAt),
      modifiedAt: new Date(snapshot.modifiedAt)
    })
  }

  public get ID(): string {
    return this._props.ID
  }

  public get name(): string {
    return this._props.name
  }

  public get email(): string {
    return this._props.email
  }

  public get password(): string {
    return this._props.password
  }

  public get createdAt(): Date {
    return this._props.createdAt
  }

  public get modifiedAt(): Date {
    return this._props.modifiedAt
  }

  public get snapshot(): Snapshot {
    return Object.freeze({
      ID: this._props.ID,
      name: this._props.name,
      email: this._props.email,
      password: this._props.password,
      createdAt: this._props.createdAt.getTime(),
      modifiedAt: this._props.modifiedAt.getTime()
    })
  }

  public async checkPassword(pwd: String): Promise<boolean> {
    return await bcrypt.compare(pwd, this._props.password)
  }

  private constructor(props: UserProps) {
    this._props = props
  }

  private _props: UserProps
}
