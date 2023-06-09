import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/questions'
import { QuestionsRespository } from '../repositories/questions-repository'
import { Either, right } from '@/core/either'

interface CreateQuestionRequest {
  authorId: string
  title: string
  content: string
}

type CreateQuestionResponse = Either<
  null,
  {
    question: Question
  }
>

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

    return right({ question })
  }
}
