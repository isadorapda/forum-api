import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { FetchRecentQuestions } from './fetch-recent-questions'
import { Question } from '../../enterprise/entities/questions'
import { createQuestion } from 'tests/factories/create-question'

let questionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestions

describe('Fetch Recent Questions Service', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestions(questionsRepository)
  })

  test('Should be able to fetch recent questions', async () => {
    await questionsRepository.create(
      createQuestion({ createdAt: new Date(2023, 0, 10) }),
    )
    await questionsRepository.create(
      createQuestion({ createdAt: new Date(2023, 0, 5) }),
    )
    await questionsRepository.create(
      createQuestion({ createdAt: new Date(2023, 0, 22) }),
    )

    const { questions } = await sut.fetchRecentQuestionsService({
      page: 1,
      limit: 10,
    })

    expect(questions).toEqual([
      expect.objectContaining({
        createdAt: new Date(2023, 0, 22),
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 0, 10),
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 0, 5),
      }),
    ])
  })

  test('Should be able to fetch paginated list of recent questions', async () => {
    for (let i = 1; i <= 12; i++) {
      await questionsRepository.create(
        createQuestion({ createdAt: new Date(2023, 0, i) }),
      )
    }

    const { questions } = await sut.fetchRecentQuestionsService({
      limit: 10,
      page: 2,
    })

    expect(questions).toHaveLength(2)
    expect(questions).toEqual([
      expect.objectContaining({
        createdAt: new Date(2023, 0, 2),
      }),
      expect.objectContaining({
        createdAt: new Date(2023, 0, 1),
      }),
    ])
  })
})
