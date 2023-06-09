import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../repositories/question-comment-repository'
import { QuestionsRespository } from '../repositories/questions-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface CommentQuestionRequest {
  questionId: string
  content: string
  authorId: string
}
type CommentQuestionResponse = Either<
  ResourceNotFoundError,
  {
    comment: QuestionComment
  }
>

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
      return left(new ResourceNotFoundError())
    }
    const comment = QuestionComment.create({
      questionId: new UniqueEntityID(questionId),
      authorId: new UniqueEntityID(authorId),
      content,
    })
    await this.questionCommentsRepository.create(comment)

    return right({ comment })
  }
}
