import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { EditQuestionService } from './edit-question'
import { createQuestion } from 'tests/factories/create-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

import { InMemoryQuestionAttachmentRespository } from 'tests/repositories/in-memory-question-attachment'
import { createQuestionAttachment } from 'tests/factories/create-question-attachment'

let questionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionService
let questionAttachmentsRepository: InMemoryQuestionAttachmentRespository

describe('Edit Question Service', () => {
  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentRespository()
    questionsRepository = new InMemoryQuestionsRepository(
      questionAttachmentsRepository,
    )
    sut = new EditQuestionService(
      questionsRepository,
      questionAttachmentsRepository,
    )
  })

  test('Should be able to edit a question', async () => {
    const newQuestion = createQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )
    await questionsRepository.create(newQuestion)

    questionAttachmentsRepository.attachmentsList.push(
      createQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      createQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    const result = await sut.editQuestionService({
      authorId: newQuestion.authorId.toString(),
      content: 'edited content',
      questionId: newQuestion.id.toString(),
      title: 'new title',
      attachmentIds: ['1', '3'],
    })

    expect(result.isRight()).toBe(true)
    expect(questionsRepository.questions).toHaveLength(1)
    expect(questionsRepository.questions[0]).toMatchObject({
      title: 'new title',
      updatedAt: expect.any(Date),
    })

    expect(
      questionsRepository.questions[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(questionsRepository.questions[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
    ])
  })

  test('Should not be able to edit a question from other user', async () => {
    const newQuestion = createQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )
    await questionsRepository.create(newQuestion)

    const result = await sut.editQuestionService({
      authorId: 'author-2',
      content: 'edit question',
      questionId: newQuestion.id.toString(),
      title: 'title',
      attachmentIds: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
