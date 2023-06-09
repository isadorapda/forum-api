import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteCommentOnAnswerRequest {
  authorId: string
  commentId: string
}
type DeleteCommentOnAnswerResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteCommentOnAnswerService {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async deleteCommentOnAnswerService({
    authorId,
    commentId,
  }: DeleteCommentOnAnswerRequest): Promise<DeleteCommentOnAnswerResponse> {
    const comment = await this.answerCommentsRepository.findById(commentId)

    if (!comment) {
      return left(new ResourceNotFoundError())
    }
    if (authorId !== comment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answerCommentsRepository.delete(comment)
    return right({})
  }
}
