import { InMemoryAnswerCommentsRepository } from 'tests/repositories/in-memory-answer-comments-repository'
import { DeleteCommentOnAnswerService } from './delete-comment-on-answer'
import { createCommentOnAnswer } from 'tests/factories/create-comment-on-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let answerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteCommentOnAnswerService

describe('Delete Comment on Answer', () => {
  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteCommentOnAnswerService(answerCommentsRepository)
  })

  test('Should be able to delete a comment in an answer', async () => {
    const newComment = createCommentOnAnswer({
      authorId: new UniqueEntityID('author-1'),
    })

    await answerCommentsRepository.create(newComment)

    await sut.deleteCommentOnAnswerService({
      authorId: 'author-1',
      commentId: newComment.id.toString(),
    })

    expect(answerCommentsRepository.answerComments).toHaveLength(0)
  })

  test('Should not be able to delete a comment from a different user', async () => {
    const newComment = createCommentOnAnswer({
      authorId: new UniqueEntityID('author-1'),
    })

    await answerCommentsRepository.create(newComment)

    await expect(() =>
      sut.deleteCommentOnAnswerService({
        authorId: 'author-2',
        commentId: newComment.id.toString(),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
