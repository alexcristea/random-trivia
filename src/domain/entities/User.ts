import { v4 as uuid } from 'uuid'

export interface Props {
  name: string
  email: string
  password: string
}

export interface Snapshot {
  userID: string
  name: string
  email: string
  password: string
  createdAt: Date
  modifiedAt: Date
}

export class User {
  private ID: string
  private name: string
  private email: string
  private password: string
  private createdAt: Date
  private modifiedAt: Date

  public get snapshot(): Snapshot {
    return Object.freeze({
      userID: this.ID,
      name: this.name,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      modifiedAt: this.modifiedAt
    })
  }

  public constructor(props: Props) {
    this.ID = uuid()
    this.name = props.name
    this.email = props.email
    this.password = props.password

    const now = new Date()
    this.createdAt = now
    this.modifiedAt = now
  }
}
