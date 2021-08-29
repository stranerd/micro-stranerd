import { IAnswerRepository } from '../../irepositories/answers'
import { BaseUseCase } from '@utils/commons'

type Input = { questionId: string, answerId: string }

export class MarkAsBestAnswerUseCase extends BaseUseCase<Input, boolean> {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		super()
		this.repository = repository
	}

	async execute (input) {
		return await this.repository.markAsBestAnswer(input.questionId, input.answerId)
	}
}
