import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  AnswerAttachment,
  AnswerAttchmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'

export function createAnswerAttachment(
  override: Partial<AnswerAttchmentProps> = {},
  id?: UniqueEntityID,
) {
  const questionAttachment = AnswerAttachment.createAttachment(
    {
      answerId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return questionAttachment
}
