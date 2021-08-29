import { ITagRepository } from '../../irepositories/tags'
import { BaseUseCase, QueryParams, QueryResults } from '@utils/commons'
import { TagEntity } from '../../entities'

export class GetTagsUseCase extends BaseUseCase<QueryParams, QueryResults<TagEntity>> {
	private repository: ITagRepository

	constructor (repository: ITagRepository) {
		super()
		this.repository = repository
	}

	async execute (query: QueryParams) {
		return await this.repository.get(query)
	}
}
