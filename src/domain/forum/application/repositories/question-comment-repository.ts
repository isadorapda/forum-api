import { PaginationProps } from '@/core/repositories/pagination-props'
import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionCommentRepository {
  create(comment: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
  delete(comment: QuestionComment): Promise<void>
  findManyByQuestionId(
    questionId: string,
    { page, limit }: PaginationProps,
  ): Promise<QuestionComment[]>
}
