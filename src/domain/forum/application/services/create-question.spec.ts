import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { CreateQuestionService } from './create-question'

let questionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionService

describe('Create a question service', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionService(questionsRepository)
  })

  test('Shoul be able to create a question', async () => {
    const { question } = await sut.createQuestionService({
      authorId: '01',
      title: 'Question 1',
      content: 'New question',
    })

    expect(question.content).toEqual('New question')
    expect(question.id).toBeTruthy()
  })
})
