import { IAnswerRepository } from '../../irepositories/answers'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, increment: boolean }

export class UpdateAnswersCommentsCountUseCase extends BaseUseCase<Input, boolean> {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.updateCommentsCount(input.id, input.increment)
	}
}