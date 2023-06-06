import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface AnswerQuestionServiceRequest {
  questionId: string
  mentorId: string
  content: string
}
interface AnswerQuestionServiceResponse {
  answer: Answer
}

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

    return { answer }
  }
}
