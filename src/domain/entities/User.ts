import { v4 as uuid } from 'uuid'
const bcrypt = require('bcrypt')

export interface Props {
  name: string
  email: string
  password: string
}

export interface Snapshot {
  ID: string
  name: string
  email: string
  password: string
  createdAt: Date
  modifiedAt: Date
}

export class User {
  private _ID: string
  private _name: string
  private _email: string
  private _password: string
  private _createdAt: Date
  private _modifiedAt: Date

  public static async create(props: Props) {
    const password = await bcrypt.hash(props.password, 10)
    return new User({ ...props, password })
  }

  public get ID(): string {
    return this._ID
  }

  public get name(): string {
    return this._name
  }

  public get email(): string {
    return this._email
  }

  public get password(): string {
    return this._password
  }

  public get createdAt(): Date {
    return this._createdAt
  }

  public get modifiedAt(): Date {
    return this._modifiedAt
  }

  public get snapshot(): Snapshot {
    return Object.freeze({
      ID: this._ID,
      name: this._name,
      email: this._email,
      password: this._password,
      createdAt: this._createdAt,
      modifiedAt: this._modifiedAt
    })
  }

  public async checkPassword(pwd: String): Promise<boolean> {
    return await bcrypt.compare(pwd, this._password)
  }

  public constructor(props: Props) {
    this._ID = uuid()
    this._name = props.name
    this._email = props.email
    this._password = props.password

    const now = new Date()
    this._createdAt = now
    this._modifiedAt = now
  }
}
