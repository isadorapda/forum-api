import { Question } from '../../enterprise/entities/questions'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRespository } from '../repositories/questions-repository'

interface ChooseQuestionBestAnswerRequest {
  authorId: string
  answerId: string
}
interface ChooseQuestionBestAnswerResponse {
  question: Question
}

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
      throw new Error('Answer not found.')
    }
    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question not found.')
    }
    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return { question }
  }
}
