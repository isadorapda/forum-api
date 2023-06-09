import { Either, left, right } from '@/core/either'
import { QuestionsRespository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteQuestionRequest {
  authorId: string
  questionId: string
}
type DeleteQuestionResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>
export class DeleteQuestionService {
  constructor(private questionsRepository: QuestionsRespository) {}

  async deleteQuestionService({
    questionId,
    authorId,
  }: DeleteQuestionRequest): Promise<DeleteQuestionResponse> {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }
    await this.questionsRepository.delete(question)
    return right({})
  }
}
