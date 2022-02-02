import { ISetRepository } from '../../irepositories/sets'
import { BaseUseCase } from '@utils/commons'

export class DeleteSetChildrenUseCase extends BaseUseCase<string, boolean> {
	private repository: ISetRepository

	constructor (repository: ISetRepository) {
		super()
		this.repository = repository
	}

	async execute (id: string) {
		return await this.repository.deleteSetChildren(id)
	}
}
