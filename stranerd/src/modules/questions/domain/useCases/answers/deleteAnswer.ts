import { IAnswerRepository } from '../../irepositories/answers'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, userId: string }

export class DeleteAnswerUseCase extends BaseUseCase<Input, boolean> {
	private repository: IAnswerRepository

	constructor (repository: IAnswerRepository) {
		super()
		this.repository = repository
	}

	async execute (input) {
		return await this.repository.delete(input.id, input.userId)
	}
}
