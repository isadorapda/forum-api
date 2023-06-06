import { QuestionsRespository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/questions'

export class InMemoryQuestionsRepository implements QuestionsRespository {
  public questions: Question[] = []

  async findById(id: string): Promise<Question | null> {
    const question = this.questions.find(
      (question) => question.id.toString() === id,
    )
    if (!question) {
      return null
    }
    return question
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.questions.findIndex(
      (quest) => quest.id === question.id,
    )
    this.questions.splice(questionIndex, 1)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.questions.find(
      (question) => question.slug.value === slug,
    )
    if (!question) {
      return null
    }
    return question
  }

  async create(question: Question): Promise<void> {
    this.questions.push(question)
  }
}
