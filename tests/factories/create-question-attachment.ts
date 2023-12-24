import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionAttchment,
  QuestionAttchmentProps,
} from '@/domain/forum/enterprise/entities/question-attachment'

export function createQuestionAttachment(
  override: Partial<QuestionAttchmentProps> = {},
  id?: UniqueEntityID,
) {
  const questionAttachment = QuestionAttchment.createAttachment(
    {
      questionId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return questionAttachment
}
