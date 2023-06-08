import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public answerComments: AnswerComment[] = []

  async create(comment: AnswerComment): Promise<void> {
    this.answerComments.push(comment)
  }

  async delete(comment: AnswerComment): Promise<void> {
    const commentIndex = this.answerComments.findIndex(
      (item) => item.id === comment.id,
    )
    this.answerComments.splice(commentIndex, 1)
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const comment = this.answerComments.find(
      (item) => item.id.toString() === id,
    )
    if (!comment) {
      return null
    }
    return comment
  }
}
