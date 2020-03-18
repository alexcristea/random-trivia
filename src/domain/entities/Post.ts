import { v4 as uuid } from 'uuid'

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

export class Post {
  public static create(props: CreateProps) {
    const ID = uuid()
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

  private constructor(props: PostProps) {
    this._props = props
  }

  private _props: PostProps
}
