import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/questions'
import { QuestionsRespository } from '../repositories/questions-repository'

interface CreateQuestionRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionResponse {
  question: Question
}

export class CreateQuestionService {
  constructor(private questionsRepository: QuestionsRespository) {}

  async createQuestionService({
    authorId,
    content,
    title,
  }: CreateQuestionRequest): Promise<CreateQuestionResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      content,
      title,
    })

    await this.questionsRepository.create(question)

    return { question }
  }
}
