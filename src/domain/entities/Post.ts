import { UUID } from './UUID'

interface PostProps {
  ID: string
  userID: string
  topic: string
  content: string
  metadata: Metadata
  createdAt: Date
  modifiedAt: Date
}

interface Metadata {
  url: string
  author: string
}

export interface CreateProps {
  userID: string
  topic: string
  content: string
  metadata: Metadata
}

export interface Snapshot {
  ID: string
  userID: string
  topic: string
  content: string
  metadata: Metadata
  createdAt: number
  modifiedAt: number
}

export class Post {
  public static create(props: CreateProps) {
    const ID = UUID.create()
    const now = new Date()

    return new Post({
      ID,
      userID: props.userID,
      topic: props.topic,
      content: props.content,
      metadata: props.metadata,
      createdAt: now,
      modifiedAt: now
    })
  }

  public static fromSnapshot(snapshot: Snapshot) {
    return new Post({
      ID: snapshot.ID,
      userID: snapshot.userID,
      topic: snapshot.topic,
      content: snapshot.content,
      metadata: snapshot.metadata,
      createdAt: new Date(snapshot.createdAt),
      modifiedAt: new Date(snapshot.modifiedAt)
    })
  }

  public get ID(): string {
    return this._props.ID
  }

  public get userID(): string {
    return this._props.userID
  }

  public get topic(): string {
    return this._props.topic
  }

  public get content(): string {
    return this._props.content
  }

  public get metadata(): Metadata {
    return this._props.metadata
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
      userID: this._props.userID,
      topic: this._props.topic,
      content: this._props.content,
      metadata: this._props.metadata,
      createdAt: this._props.createdAt.getTime(),
      modifiedAt: this._props.modifiedAt.getTime()
    })
  }

  private constructor(props: PostProps) {
    this._props = props
  }

  private _props: PostProps
}
