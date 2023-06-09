import { InMemoryAnswersRopository } from 'tests/repositories/in-memory-answers-repository'
import { EditAnswerService } from './edit-answer'
import { createAnswer } from 'tests/factories/create-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let answersRepository: InMemoryAnswersRopository
let sut: EditAnswerService

describe('Edit Answer Service', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRopository()
    sut = new EditAnswerService(answersRepository)
  })

  test('Should be able to edit an answer', async () => {
    const newAnswer = createAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1'),
    )
    await answersRepository.create(newAnswer)
    const result = await sut.editAnswerService({
      authorId: newAnswer.authorId.toString(),
      answerId: newAnswer.id.toString(),
      content: 'edited answer',
    })
    expect(result.isRight()).toBeTruthy()
    expect(answersRepository.answers).toHaveLength(1)
    expect(answersRepository.answers[0]).toMatchObject({
      updatedAt: expect.any(Date),
      content: 'edited answer',
    })
  })

  test('Should not be able to edit an answer from other user', async () => {
    const newAnswer = createAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1'),
    )
    await answersRepository.create(newAnswer)
    const result = await sut.editAnswerService({
      authorId: 'author-2',
      answerId: newAnswer.id.toString(),
      content: 'edited answer',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
