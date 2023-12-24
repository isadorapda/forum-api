import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { CreateQuestionService } from './create-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionAttachmentRespository } from 'tests/repositories/in-memory-question-attachment'

let questionsRepository: InMemoryQuestionsRepository
let questionAttachmentsRepository: InMemoryQuestionAttachmentRespository
let sut: CreateQuestionService

describe('Create a question service', () => {
  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentRespository()
    questionsRepository = new InMemoryQuestionsRepository(
      questionAttachmentsRepository,
    )
    sut = new CreateQuestionService(questionsRepository)
  })

  test('Shoul be able to create a question', async () => {
    const result = await sut.createQuestionService({
      authorId: '01',
      title: 'Question 1',
      content: 'New question',
      attachmentIds: ['01', '02'],
    })

    expect(result.isRight()).toBe(true)
    expect(questionsRepository.questions[0]).toEqual(result.value?.question)
    expect(
      questionsRepository.questions[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(questionsRepository.questions[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('01') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('02') }),
    ])
  })
})
