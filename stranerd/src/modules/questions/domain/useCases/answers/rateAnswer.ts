import { IAnswerRepository } from '../../irepositories/answers'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, rating: number }

export class RateAnswerUseCase extends BaseUseCase<Input, boolean> {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.rate(input.id, input.rating)
	}
}