import { InMemoryAnswersRopository } from 'tests/repositories/in-memory-answers-repository'
import { EditAnswerService } from './edit-answer'
import { createAnswer } from 'tests/factories/create-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryAnswerAttachmentRepository } from 'tests/repositories/in-memory-answer-attachment'
import { createAnswerAttachment } from 'tests/factories/create-answer-attachment'

let answersRepository: InMemoryAnswersRopository
let sut: EditAnswerService
let answerAttachmentRepository: InMemoryAnswerAttachmentRepository

describe('Edit Answer Service', () => {
  beforeEach(() => {
    answerAttachmentRepository = new InMemoryAnswerAttachmentRepository()
    answersRepository = new InMemoryAnswersRopository(
      answerAttachmentRepository,
    )
    sut = new EditAnswerService(answersRepository, answerAttachmentRepository)
  })

  test('Should be able to edit an answer', async () => {
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

    const result = await sut.editAnswerService({
      authorId: newAnswer.authorId.toString(),
      answerId: newAnswer.id.toString(),
      content: 'edited answer',
      attachmentIds: ['1', '3'],
    })

    expect(result.isRight()).toBeTruthy()
    expect(answersRepository.answers).toHaveLength(1)
    expect(answersRepository.answers[0]).toMatchObject({
      updatedAt: expect.any(Date),
      content: 'edited answer',
    })
    expect(answersRepository.answers[0].attachments.currentItems).toHaveLength(
      2,
    )
    expect(answersRepository.answers[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
    ])
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
      attachmentIds: [],
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
