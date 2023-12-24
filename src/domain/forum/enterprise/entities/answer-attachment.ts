import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AnswerAttchmentProps {
  answerId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class AnswerAttachment extends Entity<AnswerAttchmentProps> {
  get answerId() {
    return this.props.answerId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static createAttachment(props: AnswerAttchmentProps, id?: UniqueEntityID) {
    return new AnswerAttachment(props, id)
  }
}
