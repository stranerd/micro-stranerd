import { ITagRepository } from '../../irepositories/tags'
import { BaseUseCase } from '@utils/commons'

export class IncrementTagCountUseCase extends BaseUseCase<string, boolean> {
	private repository: ITagRepository

	constructor (repository: ITagRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.incrementCount(id)
	}
}
