import { InMemoryAnswerCommentsRepository } from 'tests/repositories/in-memory-answer-comments-repository'
import { CommentAnswerService } from './comment-on-answer'
import { InMemoryAnswersRopository } from 'tests/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { createAnswer } from 'tests/factories/create-answer'
import { InMemoryAnswerAttachmentRepository } from 'tests/repositories/in-memory-answer-attachment'

let answerCommentsRepository: InMemoryAnswerCommentsRepository
let answersRepository: InMemoryAnswersRopository
let answerAttachmentRepository: InMemoryAnswerAttachmentRepository

let sut: CommentAnswerService

describe('Comment On Answer Service', () => {
  beforeEach(() => {
    answerAttachmentRepository = new InMemoryAnswerAttachmentRepository()
    answersRepository = new InMemoryAnswersRopository(
      answerAttachmentRepository,
    )
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentAnswerService(answersRepository, answerCommentsRepository)
  })

  test('Should be able to comment on an answer', async () => {
    const newAnswer = createAnswer({}, new UniqueEntityID('answer-1'))

    await answersRepository.create(newAnswer)

    const result = await sut.commentAnswerService({
      answerId: newAnswer.id.toString(),
      authorId: 'author-1',
      content: 'new comment',
    })
    expect(result.isRight()).toBeTruthy()
    if (result.isRight()) {
      expect(result.value.comment.content).toEqual('new comment')
    }
  })
})
