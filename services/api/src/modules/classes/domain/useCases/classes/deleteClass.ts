import { IClassRepository } from '../../irepositories/classes'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, userId: string }

export class DeleteClassUseCase extends BaseUseCase<Input, boolean> {
	private repository: IClassRepository

	constructor (repository: IClassRepository) {
		super()
		this.repository = repository
	}

	async execute (data: Input) {
		return await this.repository.delete(data.id, data.userId)
	}
}
