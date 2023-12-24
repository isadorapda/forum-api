import { PaginationProps } from '@/core/repositories/pagination-props'
import { QuestionAttachmentsRespository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionsRespository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/questions'

export class InMemoryQuestionsRepository implements QuestionsRespository {
  public questions: Question[] = []
  constructor(
    private questionAttchmentRepository: QuestionAttachmentsRespository,
  ) {}

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

    this.questionAttchmentRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
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

  async save(question: Question): Promise<void> {
    const questionIndex = this.questions.findIndex(
      (quest) => quest.id === question.id,
    )

    this.questions[questionIndex] = question
  }

  async findManyRecent({ page, limit }: PaginationProps): Promise<Question[]> {
    const questions = this.questions.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )
    return questions.slice((page - 1) * limit, page * limit)
  }
}
