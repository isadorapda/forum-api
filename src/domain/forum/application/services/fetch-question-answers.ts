import { PaginationProps } from '@/core/repositories/pagination-props'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { Either, right } from '@/core/either'

interface FetchListQuestionAnswersRequest {
  questionId: string
  pagination: PaginationProps
}
type FetchListQuestionAnswersResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FetchListQuestionAnswersService {
  constructor(private answersRepository: AnswersRepository) {}

  async fetchListAnwersService({
    questionId,
    pagination,
  }: FetchListQuestionAnswersRequest): Promise<FetchListQuestionAnswersResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      pagination,
    )

    return right({ answers })
  }
}
