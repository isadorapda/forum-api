import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { DeleteQuestionService } from './delete-question'
import { createQuestion } from 'tests/factories/create-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'
import { InMemoryQuestionAttachmentRespository } from 'tests/repositories/in-memory-question-attachment'
import { createQuestionAttachment } from 'tests/factories/create-question-attachment'

let questionsRepository: InMemoryQuestionsRepository
let questiionAttachmentRepository: InMemoryQuestionAttachmentRespository
let sut: DeleteQuestionService

describe('Delete Question Service', () => {
  beforeEach(() => {
    questiionAttachmentRepository = new InMemoryQuestionAttachmentRespository()
    questionsRepository = new InMemoryQuestionsRepository(
      questiionAttachmentRepository,
    )
    sut = new DeleteQuestionService(questionsRepository)
  })
  test('Should be able to delete a question', async () => {
    const newQuestion = createQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )
    await questionsRepository.create(newQuestion)

    questiionAttachmentRepository.attachmentsList.push(
      createQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      createQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    const result = await sut.deleteQuestionService({
      questionId: 'question-1',
      authorId: 'author-1',
    })
    expect(result.isRight()).toBeTruthy()
    expect(questionsRepository.questions).toHaveLength(0)
    expect(questiionAttachmentRepository.attachmentsList).toHaveLength(0)
  })

  test('Should not be able to delete a question from different authors', async () => {
    const newQuestion = createQuestion(
      {
        authorId: new UniqueEntityID('author-2'),
      },
      new UniqueEntityID('question-2'),
    )
    await questionsRepository.create(newQuestion)
    const result = await sut.deleteQuestionService({
      questionId: 'question-2',
      authorId: 'author-1',
    })
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
