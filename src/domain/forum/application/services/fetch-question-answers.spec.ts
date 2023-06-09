import { InMemoryAnswersRopository } from 'tests/repositories/in-memory-answers-repository'
import { FetchListQuestionAnswersService } from './fetch-question-answers'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { createAnswer } from 'tests/factories/create-answer'

let answersRepository: InMemoryAnswersRopository
let sut: FetchListQuestionAnswersService

describe("Fetch Questions' Answers Service", () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRopository()
    sut = new FetchListQuestionAnswersService(answersRepository)
  })

  test("Should be able to fetch list of a question's answers ", async () => {
    await answersRepository.create(
      createAnswer({ questionId: new UniqueEntityID('question-1') }),
    )
    await answersRepository.create(
      createAnswer({ questionId: new UniqueEntityID('question-1') }),
    )

    const result = await sut.fetchListAnwersService({
      questionId: 'question-1',
      pagination: { page: 1, limit: 10 },
    })

    expect(result.value?.answers).toHaveLength(2)
    expect(result.value?.answers).toEqual([
      expect.objectContaining({
        questionId: new UniqueEntityID('question-1'),
      }),
      expect.objectContaining({
        questionId: new UniqueEntityID('question-1'),
      }),
    ])
  })

  test("Should be able to fetch paginated list of a question's answers", async () => {
    for (let i = 1; i <= 12; i++) {
      await answersRepository.create(
        createAnswer(
          { questionId: new UniqueEntityID('question-1') },
          new UniqueEntityID(`answer-${i}`),
        ),
      )
    }

    const result = await sut.fetchListAnwersService({
      questionId: 'question-1',
      pagination: { page: 2, limit: 10 },
    })

    expect(result.value?.answers).toHaveLength(2)
    expect(result.value?.answers).toEqual([
      expect.objectContaining({
        id: new UniqueEntityID(`answer-11`),
      }),
      expect.objectContaining({
        id: new UniqueEntityID(`answer-12`),
      }),
    ])
  })
})
