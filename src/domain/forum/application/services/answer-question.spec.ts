import { AnswerQuestionService } from './answer-question'
import { InMemoryAnswersRopository } from 'tests/repositories/in-memory-answers-repository'

let answersRepository: InMemoryAnswersRopository
let sut: AnswerQuestionService

describe('Answer question Service', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRopository()
    sut = new AnswerQuestionService(answersRepository)
  })
  test('Should be able to answer a question', async () => {
    const { answer } = await sut.answerService({
      mentorId: 'mentor-01',
      questionId: 'question-01',
      content: 'New answer',
    })

    expect(answer.content).toEqual('New answer')
    expect(answersRepository.answers[0].id).toEqual(answer.id)
  })
})
