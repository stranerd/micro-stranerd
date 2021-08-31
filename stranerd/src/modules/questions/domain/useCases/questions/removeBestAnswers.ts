import { IQuestionRepository } from '../../irepositories/questions'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, answerId: string }

export class RemoveBestAnswersUseCase extends BaseUseCase<Input, boolean> {
	private repository: IQuestionRepository

	constructor (repository: IQuestionRepository) {
		super()
		this.repository = repository
	}

	async execute (input) {
		return await this.repository.removeBestAnswers(input.id,input.answerId)
	}
}
