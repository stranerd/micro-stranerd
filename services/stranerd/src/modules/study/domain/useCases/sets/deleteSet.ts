import { ISetRepository } from '../../irepositories/sets'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, userId: string }

export class DeleteSetUseCase extends BaseUseCase<Input, boolean> {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		super()
		this.repository = repository
	}

	async execute (input: Input) {
		return await this.repository.delete(input.id, input.userId)
	}
}
