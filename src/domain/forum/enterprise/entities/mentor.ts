import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface MentorProps {
  name: string
}

export class Mentor extends Entity<MentorProps> {
  get name() {
    return this.props.name
  }

  static create(props: MentorProps, id?: UniqueEntityID) {
    const mentor = new Mentor(props, id)

    return mentor
  }
}
