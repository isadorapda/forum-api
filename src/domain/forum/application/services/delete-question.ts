import { QuestionsRespository } from '../repositories/questions-repository'

interface DeleteQuestionRequest {
  authorId: string
  questionId: string
}
interface DeleteQuestionResponse {}
export class DeleteQuestionService {
  constructor(private questionsRepository: QuestionsRespository) {}

  async deleteQuestionService({ questionId, authorId }: DeleteQuestionRequest) {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }
    await this.questionsRepository.delete(question)
    return {}
  }
}
