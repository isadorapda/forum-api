import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface QuestionAttchmentProps {
  questionId: UniqueEntityID
  attachmentId: UniqueEntityID
}

export class QuestionAttchment extends Entity<QuestionAttchmentProps> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static createAttachment(props: QuestionAttchmentProps, id?: UniqueEntityID) {
    return new QuestionAttchment(props, id)
  }
}
