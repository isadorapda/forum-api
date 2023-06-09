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
    const result = await sut.answerService({
      mentorId: 'mentor-01',
      questionId: 'question-01',
      content: 'New answer',
    })

    expect(result.isRight()).toBeTruthy()
    expect(answersRepository.answers[0]).toEqual(result.value?.answer)
  })
})
