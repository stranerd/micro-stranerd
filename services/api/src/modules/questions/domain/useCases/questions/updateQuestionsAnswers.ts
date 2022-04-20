import { IQuestionRepository } from '../../irepositories/questions'
import { BaseUseCase } from '@utils/commons'

type Input = { questionId: string, answerId: string, userId: string, add: boolean }

export class UpdateQuestionsAnswersUseCase extends BaseUseCase<Input, boolean> {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateAnswers(input.questionId, input.answerId, input.userId, input.add)
	}
}
