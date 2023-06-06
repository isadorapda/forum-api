import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerRequest {
  answerId: string
  authorId: string
}
interface DeleteAnswerResponse {}

export class DeleteAnswerService {
  constructor(private answersRepository: AnswersRepository) {}

  async deleteAnswerService({ answerId, authorId }: DeleteAnswerRequest) {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.')
    }
    await this.answersRepository.delete(answer)
    return {}
  }
}
