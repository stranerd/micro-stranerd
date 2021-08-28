import { DatabaseGetClauses } from '@modules/core'
import { ITagRepository } from '../../irepositories/itag'

export class GetTagsUseCase {
	private repository: ITagRepository

	constructor (repository: ITagRepository) {
		this.repository = repository
	}

	async call () {
		const conditions: DatabaseGetClauses = {
			order: { field: 'count' },
			limit: { count: 18, bottom: true }
		}
		return (await this.repository.get(conditions)).reverse()
	}
}
