import { InMemoryAnswersRopository } from 'tests/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerService } from './choose-question-best-answer'
import { createQuestion } from 'tests/factories/create-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { createAnswer } from 'tests/factories/create-answer'

let answersRepository: InMemoryAnswersRopository
let questionsRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerService

describe("Choose Question's best answer", () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRopository()
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new ChooseQuestionBestAnswerService(
      questionsRepository,
      answersRepository,
    )
  })

  test('Should be able to choose best answer for a question', async () => {
    const newQuestion = createQuestion({
      authorId: new UniqueEntityID('author-test'),
    })
    await questionsRepository.create(newQuestion)

    const newAnswer = createAnswer(
      { questionId: newQuestion.id },
      new UniqueEntityID('answer-test'),
    )
    await answersRepository.create(newAnswer)

    await sut.chooseBestAnswerService({
      authorId: newQuestion.authorId.toString(),
      answerId: newAnswer.id.toString(),
    })

    expect(questionsRepository.questions[0].bestAnswerId?.toValue()).toEqual(
      'answer-test',
    )
  })

  test("Should not be able to choose best answer from other user's question", async () => {
    const newQuestion = createQuestion({
      authorId: new UniqueEntityID('author-test'),
    })
    await questionsRepository.create(newQuestion)

    const newAnswer = createAnswer(
      { questionId: newQuestion.id },
      new UniqueEntityID('answer-test'),
    )
    await answersRepository.create(newAnswer)

    await expect(() =>
      sut.chooseBestAnswerService({
        authorId: 'author-1',
        answerId: 'answer-test',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
