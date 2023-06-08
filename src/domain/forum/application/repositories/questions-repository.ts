import { PaginationProps } from '@/core/repositories/pagination-props'
import { Question } from '../../enterprise/entities/questions'

export interface QuestionsRespository {
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  findById(id: string): Promise<Question | null>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
  findManyRecent(params: PaginationProps): Promise<Question[]>
}
