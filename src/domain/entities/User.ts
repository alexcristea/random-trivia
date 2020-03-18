import { v4 as uuid } from 'uuid'
const bcrypt = require('bcrypt')

interface ConstructorProps {
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
    const password = await bcrypt.hash(props.password, 10)
    const now = new Date()

    const userProps = {
      ID: uuid(),
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
      createdAt: this._createdAt.getTime(),
      modifiedAt: this._modifiedAt.getTime()
    })
  }

  public async checkPassword(pwd: String): Promise<boolean> {
    return await bcrypt.compare(pwd, this._password)
  }

  private constructor(props: ConstructorProps) {
    this._ID = props.ID
    this._name = props.name
    this._email = props.email
    this._password = props.password

    this._createdAt = props.createdAt
    this._modifiedAt = props.modifiedAt
  }

  private _ID: string
  private _name: string
  private _email: string
  private _password: string
  private _createdAt: Date
  private _modifiedAt: Date
}
