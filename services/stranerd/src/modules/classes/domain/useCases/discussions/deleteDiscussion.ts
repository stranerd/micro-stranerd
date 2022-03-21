import { IDiscussionRepository } from '../../irepositories/discussions'
import { BaseUseCase } from '@utils/commons'

type Input = { id: string, userId: string }

export class DeleteDiscussionUseCase extends BaseUseCase<Input, boolean> {
	private repository: IDiscussionRepository

	constructor (repository: IDiscussionRepository) {
		super()
		this.repository = repository
	}

	async execute (data: Input) {
		return await this.repository.delete(data.id, data.userId)
	}
}