import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface CommentAnswerRequest {
  authorId: string
  answerId: string
  content: string
}
type CommentAnswerResponse = Either<
  ResourceNotFoundError,
  {
    comment: AnswerComment
  }
>

export class CommentAnswerService {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async commentAnswerService({
    answerId,
    authorId,
    content,
  }: CommentAnswerRequest): Promise<CommentAnswerResponse> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const comment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentsRepository.create(comment)

    return right({ comment })
  }
}
