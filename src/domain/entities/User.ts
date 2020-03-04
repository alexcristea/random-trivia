export interface Props {
  name: string
  email: string
  password: string
}

export class User {
  private name: string
  private email: string
  private password: string
  private createdAt: Date
  private modifiedAt: Date

  public constructor(props: Props) {
    this.name = props.name
    this.email = props.email
    this.password = props.password

    const now = new Date()
    this.createdAt = now
    this.modifiedAt = now
  }
}
