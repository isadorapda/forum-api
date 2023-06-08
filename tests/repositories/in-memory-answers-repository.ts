import { PaginationProps } from '@/core/repositories/pagination-props'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRopository implements AnswersRepository {
  public answers: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.answers.push(answer)
  }

  async delete(answer: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex((item) => item.id === answer.id)
    this.answers.splice(answerIndex, 1)
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.answers.find((item) => item.id.toString() === id)
    if (!answer) {
      return null
    }
    return answer
  }

  async save(answer: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex((item) => item.id === answer.id)
    this.answers[answerIndex] = answer
  }

  async findManyByQuestionId(
    questionId: string,
    { page, limit }: PaginationProps,
  ): Promise<Answer[]> {
    const answers = this.answers
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * limit, page * limit)

    return answers
  }
}
