import { Either, left, right } from '@/core/either'
import { QuestionCommentRepository } from '../repositories/question-comment-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteCommentOnQuestionRequest {
  commentId: string
  authorId: string
}
type DeleteCommentOnQuestionResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteCommentOnQuestionService {
  constructor(private questionCommentsRepository: QuestionCommentRepository) {}

  async deleteCommentOnQuestionService({
    authorId,
    commentId,
  }: DeleteCommentOnQuestionRequest): Promise<DeleteCommentOnQuestionResponse> {
    const comment = await this.questionCommentsRepository.findById(commentId)
    if (!comment) {
      return left(new ResourceNotFoundError())
    }
    if (authorId !== comment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(comment)
    return right({})
  }
}
