import { InMemoryAnswersRopository } from 'tests/repositories/in-memory-answers-repository'
import { DeleteAnswerService } from './delete-answer'
import { createAnswer } from 'tests/factories/create-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let answersRepository: InMemoryAnswersRopository
let sut: DeleteAnswerService

describe('Delete Answer Service', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRopository()
    sut = new DeleteAnswerService(answersRepository)
  })

  test('Should be able to delete an answer', async () => {
    const newAnswer = createAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1'),
    )
    await answersRepository.create(newAnswer)

    await sut.deleteAnswerService({
      authorId: 'author-1',
      answerId: 'answer-1',
    })

    expect(answersRepository.answers).toHaveLength(0)
  })

  test('Should not be able to delete answer from other user', async () => {
    const newAnswer = createAnswer(
      { authorId: new UniqueEntityID('author-2') },
      new UniqueEntityID('answer-2'),
    )
    await answersRepository.create(newAnswer)

    await expect(() =>
      sut.deleteAnswerService({
        authorId: 'author-1',
        answerId: 'answer-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
