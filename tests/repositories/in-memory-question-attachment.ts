import { QuestionAttachmentsRespository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttchment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentRespository
  implements QuestionAttachmentsRespository
{
  public attachmentsList: QuestionAttchment[] = []

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttchment[] | null> {
    const attachments = this.attachmentsList.filter((attachment) => {
      return attachment.questionId.toString() === questionId
    })

    if (!attachments) {
      return null
    }

    return attachments
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    const questionAttachment = (this.attachmentsList =
      this.attachmentsList.filter((attachment) => {
        return attachment.questionId.toString() !== questionId
      }))

    this.attachmentsList = questionAttachment
  }
}
