import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { EditQuestionService } from './edit-question'
import { createQuestion } from 'tests/factories/create-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let questionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionService

describe('Edit Question Service', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionService(questionsRepository)
  })

  test('Should be able to edit a question', async () => {
    const newQuestion = createQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )
    await questionsRepository.create(newQuestion)
    await sut.editQuestionService({
      authorId: newQuestion.authorId.toString(),
      content: 'edited content',
      questionId: newQuestion.id.toString(),
      title: 'new title',
    })
    expect(questionsRepository.questions).toHaveLength(1)
    expect(questionsRepository.questions[0]).toMatchObject({
      title: 'new title',
      updatedAt: expect.any(Date),
    })
  })

  test('Should not be able to edit a question from other user', async () => {
    const newQuestion = createQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )
    await questionsRepository.create(newQuestion)

    await expect(() =>
      sut.editQuestionService({
        authorId: 'author-2',
        content: 'edit question',
        questionId: newQuestion.id.toString(),
        title: 'title',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
