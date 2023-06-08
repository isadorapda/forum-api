import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteCommentOnAnswerRequest {
  authorId: string
  commentId: string
}
interface DeleteCommentOnAnswerResponse {}

export class DeleteCommentOnAnswerService {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async deleteCommentOnAnswerService({
    authorId,
    commentId,
  }: DeleteCommentOnAnswerRequest): Promise<DeleteCommentOnAnswerResponse> {
    const comment = await this.answerCommentsRepository.findById(commentId)

    if (!comment) {
      throw new Error('Comment not found.')
    }
    if (authorId !== comment.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.answerCommentsRepository.delete(comment)
    return {}
  }
}
