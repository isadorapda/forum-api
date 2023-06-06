import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { DeleteQuestionService } from './delete-question'
import { createQuestion } from 'tests/factories/create-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let questionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionService

describe('Delete Question Service', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
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
    await sut.deleteQuestionService({
      questionId: 'question-1',
      authorId: 'author-1',
    })

    expect(questionsRepository.questions).toHaveLength(0)
  })

  test('Should not be able to delete a question from different authors', async () => {
    const newQuestion = createQuestion(
      {
        authorId: new UniqueEntityID('author-2'),
      },
      new UniqueEntityID('question-2'),
    )
    await questionsRepository.create(newQuestion)
    await expect(() =>
      sut.deleteQuestionService({
        questionId: 'question-2',
        authorId: 'author-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
