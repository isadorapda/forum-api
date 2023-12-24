import { InMemoryQuestionCommentsRepository } from 'tests/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { CommentQuestionService } from './comment-on-question'
import { createQuestion } from 'tests/factories/create-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionAttachmentRespository } from 'tests/repositories/in-memory-question-attachment'

let questionsRepository: InMemoryQuestionsRepository
let questionAttachmentsRepository: InMemoryQuestionAttachmentRespository

let questionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentQuestionService

describe('Comment on Question Service', () => {
  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentRespository()
    questionsRepository = new InMemoryQuestionsRepository(
      questionAttachmentsRepository,
    )
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new CommentQuestionService(
      questionsRepository,
      questionCommentsRepository,
    )
  })

  test('Should be able to comment on a question', async () => {
    const newQuestion = createQuestion({}, new UniqueEntityID('question-1'))
    await questionsRepository.create(newQuestion)

    const result = await sut.commentQuestionService({
      questionId: newQuestion.id.toString(),
      authorId: 'author-1',
      content: 'new comment',
    })
    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.comment.content).toEqual('new comment')
    }
  })
})
