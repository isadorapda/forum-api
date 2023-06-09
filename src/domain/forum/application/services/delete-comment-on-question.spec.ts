import { InMemoryQuestionCommentsRepository } from 'tests/repositories/in-memory-question-comments-repository'
import { DeleteCommentOnQuestionService } from './delete-comment-on-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { createCommentOnQuestion } from 'tests/factories/create-comment-on-question'
import { NotAllowedError } from './errors/not-allowed-error'

let questionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteCommentOnQuestionService

describe('Delete Comment on a Question Service', () => {
  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteCommentOnQuestionService(questionCommentsRepository)
  })

  test('Should be able to delete a comment in a question', async () => {
    const newComment = createCommentOnQuestion({
      authorId: new UniqueEntityID('author-1'),
    })
    await questionCommentsRepository.create(newComment)

    const result = await sut.deleteCommentOnQuestionService({
      authorId: newComment.authorId.toString(),
      commentId: newComment.id.toString(),
    })
    expect(result.isRight()).toBeTruthy()
    expect(questionCommentsRepository.questionComments).toHaveLength(0)
  })

  test('Should not be able to delete a comment from a different user', async () => {
    const newComment = createCommentOnQuestion({
      authorId: new UniqueEntityID('author-1'),
    })
    await questionCommentsRepository.create(newComment)

    const result = await sut.deleteCommentOnQuestionService({
      authorId: 'author-2',
      commentId: newComment.id.toString(),
    })
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
