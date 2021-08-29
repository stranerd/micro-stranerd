import { DatabaseGetClauses } from '@modules/core'
import { ITagRepository } from '../../irepositories/itag'
import { TagEntity } from '../../entities/tags'

export class ListenToTagsUseCase {
	private repository: ITagRepository

	constructor (repository: ITagRepository) {
		this.repository = repository
	}

	async call (callback: (entities: TagEntity[]) => void) {
		const conditions: DatabaseGetClauses = {
			order: { field: 'count' },
			limit: { count: 18, bottom: true }
		}
		const cb = (entities: TagEntity[]) => {
			callback(entities.reverse())
		}
		return await this.repository.listen(cb, conditions)
	}
}
