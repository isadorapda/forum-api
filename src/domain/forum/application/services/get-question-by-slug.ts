import { Question } from '../../enterprise/entities/questions'
import { QuestionsRespository } from '../repositories/questions-repository'

interface GetQuestionBySlugRequest {
  slug: string
}
interface GetQuestionBySlugResponse {
  question: Question
}

export class GetQuestionBySlugService {
  constructor(private questionsRepository: QuestionsRespository) {}

  async getQuestionSlugService({
    slug,
  }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
    const question = await this.questionsRepository.findBySlug(slug)
    if (!question) {
      throw new Error('Question not found')
    }
    return { question }
  }
}
