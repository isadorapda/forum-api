import { InMemoryQuestionCommentsRepository } from 'tests/repositories/in-memory-question-comments-repository'
import { FetchQuestionCommentsService } from './fetch-question-comments'
import { createQuestion } from 'tests/factories/create-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { createCommentOnQuestion } from 'tests/factories/create-comment-on-question'

let questionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsService

describe('Fetch Question Comments Service', () => {
  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsService(questionCommentsRepository)
  })

  test('Should be able to fetch a list of comments on a question', async () => {
    const newQuestion = createQuestion({}, new UniqueEntityID('question-1'))

    await questionCommentsRepository.create(
      createCommentOnQuestion({ questionId: newQuestion.id }),
    )
    await questionCommentsRepository.create(
      createCommentOnQuestion({ questionId: newQuestion.id }),
    )
    await questionCommentsRepository.create(
      createCommentOnQuestion({ questionId: newQuestion.id }),
    )

    const { comments } = await sut.fetchQuestionCommentsService({
      questionId: newQuestion.id.toString(),
      pagination: { limit: 10, page: 1 },
    })

    expect(comments).toHaveLength(3)
  })

  test('Should be able to fetch paginated list of comments on a question', async () => {
    for (let i = 0; i < 12; i++) {
      await questionCommentsRepository.create(
        createCommentOnQuestion({
          questionId: new UniqueEntityID('question-1'),
        }),
      )
    }
    const { comments } = await sut.fetchQuestionCommentsService({
      questionId: 'question-1',
      pagination: { limit: 10, page: 2 },
    })

    expect(comments).toHaveLength(2)
  })
})
