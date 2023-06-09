import { InMemoryAnswerCommentsRepository } from 'tests/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsService } from './fetch-answer-comments'
import { createAnswer } from 'tests/factories/create-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { createCommentOnAnswer } from 'tests/factories/create-comment-on-answer'

let answerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsService

describe('Fetch Answer Comments Service', () => {
  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsService(answerCommentsRepository)
  })

  test('Should be able to fetch a list of comments on an answer', async () => {
    const newAnswer = createAnswer({}, new UniqueEntityID('answer-1'))

    await answerCommentsRepository.create(
      createCommentOnAnswer({ answerId: newAnswer.id }),
    )
    await answerCommentsRepository.create(
      createCommentOnAnswer({ answerId: newAnswer.id }),
    )
    await answerCommentsRepository.create(
      createCommentOnAnswer({ answerId: newAnswer.id }),
    )

    const result = await sut.fetchAnswerCommentsService({
      answerId: newAnswer.id.toString(),
      pagination: { limit: 10, page: 1 },
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.comments).toHaveLength(3)
  })

  test('Should be able to fetch paginated list of comments on an answer', async () => {
    for (let i = 0; i < 12; i++) {
      await answerCommentsRepository.create(
        createCommentOnAnswer({
          answerId: new UniqueEntityID('answer-1'),
        }),
      )
    }
    const result = await sut.fetchAnswerCommentsService({
      answerId: 'answer-1',
      pagination: { limit: 10, page: 2 },
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})
