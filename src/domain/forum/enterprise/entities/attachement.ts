import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AttachementProps {
  name: string
  url: string
}

export class Attachement extends Entity<AttachementProps> {
  get name() {
    return this.props.name
  }

  get url() {
    return this.props.url
  }

  static createAttachment(props: AttachementProps, id?: UniqueEntityID) {
    return new Attachement(props, id)
  }
}
