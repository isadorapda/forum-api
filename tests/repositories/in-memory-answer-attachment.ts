import { AnswerAttachmentsRespository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentRepository
  implements AnswerAttachmentsRespository
{
  public answerAttachments: AnswerAttachment[] = []

  async findManyByQuestionId(
    questionId: string,
  ): Promise<AnswerAttachment[] | null> {
    const attachments = this.answerAttachments.filter((attachment) => {
      return attachment.answerId.toString() === questionId
    })

    if (!attachments) return null

    return attachments
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    const attachments = this.answerAttachments.filter((attachment) => {
      return attachment.answerId.toString() !== questionId
    })

    this.answerAttachments = attachments
  }
}
