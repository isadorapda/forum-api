import { InMemoryAnswerAttachmentRepository } from 'tests/repositories/in-memory-answer-attachment'
import { AnswerQuestionService } from './answer-question'
import { InMemoryAnswersRopository } from 'tests/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let answersRepository: InMemoryAnswersRopository
let answerAttachmentRepository: InMemoryAnswerAttachmentRepository
let sut: AnswerQuestionService

describe('Answer question Service', () => {
  beforeEach(() => {
    answerAttachmentRepository = new InMemoryAnswerAttachmentRepository()
    answersRepository = new InMemoryAnswersRopository(
      answerAttachmentRepository,
    )
    sut = new AnswerQuestionService(answersRepository)
  })
  test('Should be able to answer a question', async () => {
    const result = await sut.answerService({
      mentorId: 'mentor-01',
      questionId: 'question-01',
      content: 'New answer',
      attachmentIds: ['01', '02'],
    })

    expect(result.isRight()).toBeTruthy()
    expect(answersRepository.answers[0]).toEqual(result.value?.answer)
    expect(answersRepository.answers[0].attachments.currentItems).toHaveLength(
      2,
    )
    expect(answersRepository.answers[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('01') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('02') }),
    ])
  })
})
