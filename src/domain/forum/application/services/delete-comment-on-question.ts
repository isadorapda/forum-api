import { QuestionCommentRepository } from '../repositories/question-comment-repository'

interface DeleteCommentOnQuestionRequest {
  commentId: string
  authorId: string
}
interface DeleteCommentOnQuestionResponse {}

export class DeleteCommentOnQuestionService {
  constructor(private questionCommentsRepository: QuestionCommentRepository) {}

  async deleteCommentOnQuestionService({
    authorId,
    commentId,
  }: DeleteCommentOnQuestionRequest): Promise<DeleteCommentOnQuestionResponse> {
    const comment = await this.questionCommentsRepository.findById(commentId)
    if (!comment) {
      throw new Error('Comment not found.')
    }
    if (authorId !== comment.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.questionCommentsRepository.delete(comment)
    return {}
  }
}
