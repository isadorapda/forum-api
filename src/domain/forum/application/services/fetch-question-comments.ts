import { PaginationProps } from '@/core/repositories/pagination-props'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../repositories/question-comment-repository'

interface FetchQuestionCommentsRequest {
  questionId: string
  pagination: PaginationProps
}
interface FetchQuestionCommentsResponse {
  comments: QuestionComment[]
}

export class FetchQuestionCommentsService {
  constructor(private questionCommentsRepository: QuestionCommentRepository) {}

  async fetchQuestionCommentsService({
    questionId,
    pagination,
  }: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsResponse> {
    const comments = await this.questionCommentsRepository.findManyByQuestionId(
      questionId,
      pagination,
    )
    return { comments }
  }
}
