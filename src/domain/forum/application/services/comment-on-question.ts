import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../repositories/question-comment-repository'
import { QuestionsRespository } from '../repositories/questions-repository'

interface CommentQuestionRequest {
  questionId: string
  content: string
  authorId: string
}
interface CommentQuestionResponse {
  comment: QuestionComment
}

export class CommentQuestionService {
  constructor(
    private questionsRepository: QuestionsRespository,
    private questionCommentsRepository: QuestionCommentRepository,
  ) {}

  async commentQuestionService({
    questionId,
    content,
    authorId,
  }: CommentQuestionRequest): Promise<CommentQuestionResponse> {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) {
      throw new Error('Question not found.')
    }
    const comment = QuestionComment.create({
      questionId: new UniqueEntityID(questionId),
      authorId: new UniqueEntityID(authorId),
      content,
    })
    await this.questionCommentsRepository.create(comment)

    return { comment }
  }
}
