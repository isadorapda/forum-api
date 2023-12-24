import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { Either, right } from '@/core/either'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'

interface AnswerQuestionServiceRequest {
  questionId: string
  mentorId: string
  content: string
  attachmentIds: string[]
}
type AnswerQuestionServiceResponse = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionService {
  constructor(private answerRepository: AnswersRepository) {}
  async answerService({
    content,
    questionId,
    mentorId,
    attachmentIds,
  }: AnswerQuestionServiceRequest): Promise<AnswerQuestionServiceResponse> {
    const answer = Answer.create({
      content,
      questionId: new UniqueEntityID(questionId),
      authorId: new UniqueEntityID(mentorId),
    })

    const answerAttachments = attachmentIds.map((attachmentId) => {
      return AnswerAttachment.createAttachment({
        answerId: answer.id,
        attachmentId: new UniqueEntityID(attachmentId),
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answerRepository.create(answer)

    return right({ answer })
  }
}
