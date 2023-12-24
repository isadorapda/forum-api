import { QuestionAttchment } from '../../enterprise/entities/question-attachment'

export interface QuestionAttachmentsRespository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttchment[] | null>
  deleteManyByQuestionId(questionId: string): Promise<void>
}
