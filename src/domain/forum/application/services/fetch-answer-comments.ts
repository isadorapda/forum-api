import { PaginationProps } from '@/core/repositories/pagination-props'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsRequest {
  answerId: string
  pagination: PaginationProps
}
interface FetchAnswerCommentsResponse {
  comments: AnswerComment[]
}

export class FetchAnswerCommentsService {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async fetchAnswerCommentsService({
    answerId,
    pagination,
  }: FetchAnswerCommentsRequest): Promise<FetchAnswerCommentsResponse> {
    const comments = await this.answerCommentsRepository.findManyByAnswerId(
      answerId,
      pagination,
    )
    return { comments }
  }
}
