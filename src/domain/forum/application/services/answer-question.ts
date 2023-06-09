import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { Either, right } from '@/core/either'

interface AnswerQuestionServiceRequest {
  questionId: string
  mentorId: string
  content: string
}
type AnswerQuestionServiceResponse = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionService {
  constructor(private answerRepository: AnswersRepository) {}
  async answerService({
    content,
    questionId,
    mentorId,
  }: AnswerQuestionServiceRequest): Promise<AnswerQuestionServiceResponse> {
    const answer = Answer.create({
      content,
      questionId: new UniqueEntityID(questionId),
      authorId: new UniqueEntityID(mentorId),
    })

    await this.answerRepository.create(answer)

    return right({ answer })
  }
}
