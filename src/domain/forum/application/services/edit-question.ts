import { Question } from '../../enterprise/entities/questions'
import { QuestionsRespository } from '../repositories/questions-repository'

interface EditQuestionRequest {
  title: string
  content: string
  authorId: string
  questionId: string
}

interface EditQuestionResponse {
  question: Question
}

export class EditQuestionService {
  constructor(private questionsRepository: QuestionsRespository) {}

  async editQuestionService({
    title,
    content,
    authorId,
    questionId,
  }: EditQuestionRequest): Promise<EditQuestionResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }
    if (question.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }
    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return { question }
  }
}
