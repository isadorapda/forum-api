import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/questions'
import { QuestionsRespository } from '../repositories/questions-repository'
import { Either, right } from '@/core/either'
import { QuestionAttchment } from '../../enterprise/entities/question-attachment'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'

interface CreateQuestionRequest {
  authorId: string
  title: string
  content: string
  attachmentIds: string[]
}

type CreateQuestionResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionService {
  constructor(private questionsRepository: QuestionsRespository) {}

  async createQuestionService({
    authorId,
    content,
    title,
    attachmentIds,
  }: CreateQuestionRequest): Promise<CreateQuestionResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      content,
      title,
    })

    const questionAttachments = attachmentIds.map((attachmentId) => {
      return QuestionAttchment.createAttachment({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      })
    })

    question.attachments = new QuestionAttachmentList(questionAttachments)

    await this.questionsRepository.create(question)

    return right({ question })
  }
}
