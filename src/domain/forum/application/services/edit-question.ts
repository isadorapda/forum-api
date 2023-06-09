import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/questions'
import { QuestionsRespository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { NotAllowedError } from './errors/not-allowed-error'

interface EditQuestionRequest {
  title: string
  content: string
  authorId: string
  questionId: string
}

type EditQuestionResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionService {
  constructor(private questionsRepository: QuestionsRespository) {}

  async editQuestionService({
    title,
    content,
    authorId,
    questionId,
  }: EditQuestionRequest): Promise<EditQuestionResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }
    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }
    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return right({ question })
  }
}
