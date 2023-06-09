import { PaginationProps } from '@/core/repositories/pagination-props'
import { Question } from '../../enterprise/entities/questions'
import { QuestionsRespository } from '../repositories/questions-repository'
import { Either, right } from '@/core/either'

type FetchRecentQuestionsResponse = Either<
  null,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestions {
  constructor(private questionsRepository: QuestionsRespository) {}

  async fetchRecentQuestionsService(
    pagination: PaginationProps,
  ): Promise<FetchRecentQuestionsResponse> {
    const questions = await this.questionsRepository.findManyRecent(pagination)
    return right({ questions })
  }
}
