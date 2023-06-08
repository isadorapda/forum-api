import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comment-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentRepository
{
  public questionComments: QuestionComment[] = []

  async create(comment: QuestionComment): Promise<void> {
    this.questionComments.push(comment)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const comment = this.questionComments.find(
      (item) => item.id.toString() === id,
    )
    if (!comment) {
      return null
    }
    return comment
  }

  async delete(comment: QuestionComment): Promise<void> {
    const commentIndex = this.questionComments.findIndex(
      (item) => item.id === comment.id,
    )
    this.questionComments.splice(commentIndex, 1)
  }
}
