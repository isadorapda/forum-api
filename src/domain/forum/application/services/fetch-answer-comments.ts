import { PaginationProps } from '@/core/repositories/pagination-props'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { Either, right } from '@/core/either'

interface FetchAnswerCommentsRequest {
  answerId: string
  pagination: PaginationProps
}
type FetchAnswerCommentsResponse = Either<
  null,
  {
    comments: AnswerComment[]
  }
>

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
    return right({ comments })
  }
}
