import { InMemoryAnswersRopository } from 'tests/repositories/in-memory-answers-repository'
import { DeleteAnswerService } from './delete-answer'
import { createAnswer } from 'tests/factories/create-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentRepository } from 'tests/repositories/in-memory-answer-attachment'
import { createAnswerAttachment } from 'tests/factories/create-answer-attachment'

let answersRepository: InMemoryAnswersRopository
let answerAttachmentRepository: InMemoryAnswerAttachmentRepository
let sut: DeleteAnswerService

describe('Delete Answer Service', () => {
  beforeEach(() => {
    answerAttachmentRepository = new InMemoryAnswerAttachmentRepository()
    answersRepository = new InMemoryAnswersRopository(
      answerAttachmentRepository,
    )
    sut = new DeleteAnswerService(answersRepository)
  })

  test('Should be able to delete an answer', async () => {
    const newAnswer = createAnswer(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('answer-1'),
    )
    await answersRepository.create(newAnswer)

    answerAttachmentRepository.answerAttachments.push(
      createAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      createAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    const result = await sut.deleteAnswerService({
      authorId: 'author-1',
      answerId: 'answer-1',
    })
    expect(result.isRight()).toBeTruthy()
    expect(answersRepository.answers).toHaveLength(0)
    expect(answerAttachmentRepository.answerAttachments).toHaveLength(0)
  })

  test('Should not be able to delete answer from other user', async () => {
    const newAnswer = createAnswer(
      { authorId: new UniqueEntityID('author-2') },
      new UniqueEntityID('answer-2'),
    )
    await answersRepository.create(newAnswer)

    const result = await sut.deleteAnswerService({
      authorId: 'author-1',
      answerId: 'answer-2',
    })
    expect(result.isLeft()).toBe(true)
  })
})
