import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { GetQuestionBySlugService } from './get-question-by-slug'
import { createQuestion } from 'tests/factories/create-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let questionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugService

describe('Get question by slug service', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugService(questionsRepository)
  })
  test('Should be able to get a question by its slut', async () => {
    const newQuestion = createQuestion({
      slug: Slug.create('example-question'),
    })
    await questionsRepository.create(newQuestion)

    const { question } = await sut.getQuestionSlugService({
      slug: newQuestion.slug.value,
    })

    expect(question.slug.value).toEqual('example-question')
    expect(question.id).toBeTruthy()
  })
})
