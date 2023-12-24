import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export interface AnswerAttachmentsRespository {
  findManyByQuestionId(questionId: string): Promise<AnswerAttachment[] | null>
  deleteManyByQuestionId(questionId: string): Promise<void>
}
