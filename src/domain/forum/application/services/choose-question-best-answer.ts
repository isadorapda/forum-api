import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/questions'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRespository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { NotAllowedError } from './errors/not-allowed-error'

interface ChooseQuestionBestAnswerRequest {
  authorId: string
  answerId: string
}
type ChooseQuestionBestAnswerResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChooseQuestionBestAnswerService {
  constructor(
    private questionsRepository: QuestionsRespository,
    private answersRepository: AnswersRepository,
  ) {}

  async chooseBestAnswerService({
    authorId,
    answerId,
  }: ChooseQuestionBestAnswerRequest): Promise<ChooseQuestionBestAnswerResponse> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) {
      return left(new ResourceNotFoundError())
    }
    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }
    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return right({ question })
  }
}
