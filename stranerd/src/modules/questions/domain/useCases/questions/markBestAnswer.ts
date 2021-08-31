import { IQuestionRepository } from '../../irepositories/questions'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, answerId: string, userId: string }

export class MarkBestAnswerUseCase extends BaseUseCase<Input, boolean> {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (input) {
		return await this.repository.markBestAnswer(input.id, input.answerId, input.userId)
	}
}
